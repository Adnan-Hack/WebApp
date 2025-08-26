import Layout from "@/components/Layout";

export default function BlogPost() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-2xl mb-3 text-gold-neon">Premium Effects with Free AI Tools</h1>
        <p className="text-gray-700 dark:text-gold mb-6">
          Tips for achieving cinematic, premium-quality video effects using only open-source or free APIs.
        </p>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gold">
          <li>Use high-resolution images for best results</li>
          <li>Tweak prompts for desired 3D motion</li>
          <li>Experiment with aspect ratios and durations</li>
        </ul>
      </div>
    </Layout>
  );
}