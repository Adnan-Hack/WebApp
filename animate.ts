import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import formidable from "formidable";
import fs from "fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { durationFrames } from "@/utils/durationMap";

export const config = {
  api: { bodyParser: false }
};

// Firebase admin init (idempotent)
if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

const db = getFirestore();
const storage = getStorage().bucket();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ error: "Bad form data" });
      try {
        const prompt = fields.prompt as string;
        const aspect_ratio = fields.aspect_ratio as string;
        const duration = fields.duration as string;
        const seed = fields.seed as string | undefined;
        const user = req.headers.authorization ? await getAuth().verifyIdToken(req.headers.authorization.split(" ")[1]) : null;
        const uid = user?.uid || "demo";
        const images = Array.isArray(files.images) ? files.images : [files.images];
        // Save image(s) temp
        const imagePaths = images.map((img: any) => img.filepath);
        // Call Replicate API
        const replicateRes = await axios.post(
          "https://api.replicate.com/v1/predictions",
          {
            version: "6c8b2c8cfd8e4a9d85fbb2a1d1180b4d9783f7f5b2c418d6c1d696d3c3d9d42b",
            input: {
              image: fs.readFileSync(imagePaths[0], { encoding: "base64" }),
              prompt,
              seed: seed || undefined,
              width: aspect_ratio === "9:16" ? 576 : 1024,
              height: aspect_ratio === "16:9" ? 576 : 1024,
              num_frames: durationFrames[duration as keyof typeof durationFrames] || 90
            }
          },
          {
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
              "Content-Type": "application/json"
            }
          }
        );
        const prediction = replicateRes.data;
        const jobId = uuidv4();
        await db.collection("jobs").doc(jobId).set({
          status: "processing",
          uid,
          prompt,
          created: Date.now(),
          predictionId: prediction.id
        });
        res.status(200).json({ jobId });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    });
  } else if (req.method === "GET" && req.query.status !== undefined) {
    // Job status poll endpoint
    const jobId = req.query.jobId as string;
    const jobDoc = await db.collection("jobs").doc(jobId).get();
    if (!jobDoc.exists) return res.status(404).json({ status: "not_found" });
    return res.status(200).json({ status: jobDoc.data()?.status });
  } else {
    res.status(405).end();
  }
};

export default handler;