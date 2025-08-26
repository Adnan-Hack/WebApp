import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}
const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jobId = req.query.jobId as string;
  if (!jobId) return res.status(400).json({ status: "missing_jobId" });
  const jobDoc = await db.collection("jobs").doc(jobId).get();
  if (!jobDoc.exists) return res.status(404).json({ status: "not_found" });
  return res.status(200).json({ status: jobDoc.data()?.status });
}