import Layout from "@/components/Layout";

export default function BlogPost() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-2xl mb-3 text-gold-neon">How AI is Revolutionizing Creative Video</h1>
        <p className="text-gray-700 dark:text-gold mb-6">
          Explore how prompt-driven AI tools are enabling a new wave of animation and creativity in video production. ...
        </p>
        <p>
          <b>Watson AI</b> leverages state-of-the-art models like AnimateDiff to bring your static images to life, empowering creators of all skill levels to produce cinematic motion videos with ease. With bulk uploads, prompt-driven effects, and a premium user experience, the future of creative video is here for everyone.
        </p>
      </div>
    </Layout>
  );
}