import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-3xl mb-4 text-gold-neon">About Watson AI</h1>
        <p>
          Watson AI is a prompt-driven animation generator—upload images, write your idea, and get premium-quality videos with cinematic 3D motion. Built for creators, marketers, and anyone who wants to bring images to life with open source AI.
        </p>
      </div>
    </Layout>
  );
}