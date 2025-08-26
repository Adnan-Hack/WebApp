import { useState } from "react";
import { auth } from "@/firebase/client";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [isReg, setIsReg] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      if (isReg) {
        await createUserWithEmailAndPassword(auth, email, pw);
      } else {
        await signInWithEmailAndPassword(auth, email, pw);
      }
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded shadow-md p-8 max-w-md mx-auto my-10">
      <h2 className="font-luxury text-2xl mb-4 text-gold-neon text-center">
        {isReg ? "Sign Up" : "Login"}
      </h2>
      <input
        type="email"
        className="block w-full border-b p-2 mb-4 bg-transparent"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="block w-full border-b p-2 mb-4 bg-transparent"
        placeholder="Password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        required
      />
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <button type="submit" className="w-full bg-gold-neon text-black rounded py-2 font-semibold mb-2">
        {isReg ? "Create Account" : "Login"}
      </button>
      <button
        type="button"
        onClick={() => setIsReg(!isReg)}
        className="w-full text-gold underline"
      >
        {isReg ? "Already have an account? Login" : "No account? Register"}
      </button>
    </form>
  );
}