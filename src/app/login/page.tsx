"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      window.location.href = "/chat";
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border bg-background p-8 shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo.png"
            alt="Uplink"
            width={48}
            height={48}
            className="rounded-xl"
            priority
          />
          <h1 className="text-xl font-semibold">Sign in to Uplink</h1>
          <p className="text-sm text-muted-foreground">
            ISP support assistant
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          No account?{" "}
          <button
            type="button"
            onClick={async () => {
              setError("");
              setLoading(true);
              const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              });
              if (res.ok) {
                await handleSubmit(new Event("submit") as unknown as FormEvent);
              } else {
                const data = await res.json().catch(() => ({}));
                setError(data.error ?? "Registration failed");
                setLoading(false);
              }
            }}
            className="font-medium text-primary hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
