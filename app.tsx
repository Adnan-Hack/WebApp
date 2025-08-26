import { useState } from "react";
import Layout from "@/components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import UploadForm from "@/components/UploadForm";
import AuthGate from "@/components/AuthGate";
import VideoLibrary from "@/components/VideoLibrary";

export default function AppPage() {
  const [refreshLibrary, setRefreshLibrary] = useState(false);

  return (
    <Layout>
      <AuthGate>
        <section className="max-w-4xl mx-auto py-10 px-4">
          <motion.h1
            className="font-luxury text-3xl mb-2 text-gold-neon text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Generate Your Animated Video
          </motion.h1>
          <UploadForm onSuccess={() => setRefreshLibrary((v) => !v)} />
          <VideoLibrary refresh={refreshLibrary} />
        </section>
      </AuthGate>
    </Layout>
  );
}