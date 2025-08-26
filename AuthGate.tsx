import { useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import LoginForm from "./LoginForm";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-10 text-center text-gold">Loading...</div>;
  if (!user) return <LoginForm />;
  return <>{children}</>;
}