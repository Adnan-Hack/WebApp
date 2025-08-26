import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/client";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function VideoLibrary({ refresh }: { refresh: boolean }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setLoading(true);
      const q = query(
        collection(db, "videos"),
        where("uid", "==", user.uid),
        orderBy("created", "desc")
      );
      const snap = await getDocs(q);
      const vids = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (mounted) {
        setVideos(vids);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [refresh]);

  if (loading) return <div className="text-center text-gold">Loading library...</div>;
  if (!videos.length) return <div className="text-center text-gray-400">No videos yet. Generate one above!</div>;
  return (
    <div>
      <h2 className="font-luxury text-xl mb-4 text-gold-neon">Your Videos</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {videos.map((v) => (
          <div key={v.id} className="rounded-lg border p-4 shadow bg-white dark:bg-black">
            <video controls src={v.publicUrl} className="w-full rounded mb-2" />
            <div className="text-xs text-gray-700 dark:text-gold mb-1">Prompt: <span className="font-semibold">{v.prompt}</span></div>
            <div className="text-xs mb-1">Duration: {v.duration}, Aspect: {v.aspect_ratio}</div>
            <div className="flex gap-2">
              <a target="_blank" rel="noopener noreferrer" href={v.publicUrl} className="text-gold underline">Download MP4</a>
              {v.webmUrl && (
                <a target="_blank" rel="noopener noreferrer" href={v.webmUrl} className="text-gold underline">WebM</a>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-2">{new Date(v.created).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}