import Link from "next/link";
import { ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800 bg-white dark:bg-black shadow-md">
        <Link href="/" className="text-2xl font-luxury text-gold-neon">
          Watson AI
        </Link>
        <nav className="flex gap-6 items-center">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="text-center py-6 border-t dark:border-gray-800 bg-white dark:bg-black text-sm text-gray-700 dark:text-gold-neon mt-8">
        &copy; {new Date().getFullYear()} Watson AI. All rights reserved.
      </footer>
    </div>
  );
}