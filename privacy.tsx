import Layout from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="font-luxury text-3xl mb-4 text-gold-neon">Privacy Policy</h1>
        <p>
          Watson AI uses Firebase Auth, Firestore, and Storage to provide a secure and private experience. Data is never sold or shared. Uploaded images are processed for video generation and deleted from temporary storage.
        </p>
      </div>
    </Layout>
  );
}