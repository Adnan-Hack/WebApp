import Layout from "@/components/Layout";
import { useState } from "react";
import { auth, db } from "@/firebase/client";
import { deleteDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function AdminPage() {
  const [msg, setMsg] = useState("");
  async function clearDemoJobs() {
    setMsg("Clearing...");
    const q = query(collection(db, "videos"), where("uid", "==", "demo"));
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map(doc => deleteDoc(doc.ref)));
    setMsg("Demo jobs cleared!");
  }
  return (
    <Layout>
      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-2xl mb-3 text-gold-neon">Admin: Clear Demo Jobs</h1>
        <button onClick={clearDemoJobs} className="bg-gold-neon text-black px-6 py-2 rounded font-bold">
          Clear Demo Videos
        </button>
        {msg && <div className="mt-4 text-gold">{msg}</div>}
      </div>
    </Layout>
  );
}