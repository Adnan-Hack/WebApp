import { useRef, useState } from "react";
import axios from "axios";
import { durationFrames } from "@/utils/durationMap";
import clsx from "clsx";

const aspectRatios = [
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
  { label: "1:1", value: "1:1" },
  { label: "4:5", value: "4:5" }
];
const durations = [
  { label: "3s", value: "3s" },
  { label: "5s", value: "5s" },
  { label: "8s", value: "8s" },
  { label: "10s", value: "10s" }
];

export default function UploadForm({ onSuccess }: { onSuccess: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [duration, setDuration] = useState("3s");
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    setProgress("Queued");
    try {
      const formData = new FormData();
      files.forEach(f => formData.append("images", f));
      formData.append("prompt", prompt);
      if (seed) formData.append("seed", seed);
      formData.append("aspect_ratio", aspect);
      formData.append("duration", duration);
      setProgress("Uploading...");
      const res = await axios.post("/api/animate", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setProgress("Processing...");
      // Poll for job status
      let status = "processing";
      let id = res.data.jobId;
      let tries = 0;
      while (status !== "done" && tries < 40) {
        await new Promise(r => setTimeout(r, 4000));
        const s = await axios.get(`/api/animate/status?jobId=${id}`);
        status = s.data.status;
        setProgress(status.charAt(0).toUpperCase() + status.slice(1));
        tries++;
      }
      if (status === "done") {
        setProgress("Done!");
        onSuccess();
      } else {
        setProgress("Failed or Timed out.");
      }
    } catch (e: any) {
      setProgress("Error: " + (e.response?.data?.error || e.message));
    }
    setProcessing(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-black p-6 rounded-lg shadow-lg mb-10 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFile}
          className="flex-1 border p-2 rounded text-sm"
        />
        <input
          type="text"
          placeholder="Prompt (e.g. astronaut surfing, 3D motion...)"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
          className="flex-1 border p-2 rounded text-sm"
        />
        <input
          type="text"
          placeholder="Optional: Seed"
          value={seed}
          onChange={e => setSeed(e.target.value)}
          className="w-28 border p-2 rounded text-sm"
        />
      </div>
      <div className="flex gap-4">
        <div>
          <label className="block text-xs text-gray-600 dark:text-gold">Aspect</label>
          <select value={aspect} onChange={e => setAspect(e.target.value)} className="border rounded px-2 py-1">
            {aspectRatios.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gold">Duration</label>
          <select value={duration} onChange={e => setDuration(e.target.value)} className="border rounded px-2 py-1">
            {durations.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className={clsx(
          "bg-gold-neon text-black px-8 py-2 rounded font-bold mt-2",
          processing && "opacity-60 cursor-not-allowed"
        )}
        disabled={processing}
      >
        {processing ? progress || "Processing..." : "Generate Animation"}
      </button>
      {progress && !processing && (
        <div className="text-gold mt-2">{progress}</div>
      )}
    </form>
  );
}