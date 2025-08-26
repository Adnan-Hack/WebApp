import Layout from "@/components/Layout";
import Link from "next/link";

const posts = [
  {
    slug: "ai-creative-video",
    title: "How AI is Revolutionizing Creative Video",
    excerpt: "Explore how prompt-driven AI tools are enabling a new wave of animation and creativity in video production.",
  },
  {
    slug: "animatediff-open-source",
    title: "AnimateDiff & Open Source: Unleashing 3D Motion",
    excerpt: "A dive into AnimateDiff and open-source models powering 3D-like video effects for everyone.",
  },
  {
    slug: "premium-ai-effects",
    title: "Premium Effects with Free AI Tools",
    excerpt: "Tips for achieving cinematic, premium-quality video effects using only open-source or free APIs.",
  }
];

export default function BlogIndex() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-3xl mb-6 text-gold-neon">Blog</h1>
        <div className="space-y-8">
          {posts.map(p => (
            <div key={p.slug} className="border-b pb-6">
              <Link href={`/blog/${p.slug}`} className="text-2xl text-gold-neon font-luxury hover:underline">{p.title}</Link>
              <p className="text-gray-700 dark:text-gold mt-2">{p.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}