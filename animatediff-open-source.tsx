import Layout from "@/components/Layout";

export default function BlogPost() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-2xl mb-3 text-gold-neon">AnimateDiff & Open Source: Unleashing 3D Motion</h1>
        <p className="text-gray-700 dark:text-gold mb-6">
          A dive into AnimateDiff and open-source models powering 3D-like video effects for everyone.
        </p>
        <p>
          AnimateDiff, available on Replicate and HuggingFace, makes it possible to add smooth, realistic motion to images. Watson AI integrates with these APIs to offer free-tier, premium-quality results—no expensive cloud GPU needed.
        </p>
      </div>
    </Layout>
  );
}