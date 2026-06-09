"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="bg-white text-black px-6 py-3 rounded-lg"
      >
        Logg inn med Google
      </button>
    </main>
  );
}