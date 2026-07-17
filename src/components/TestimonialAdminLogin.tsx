"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function TestimonialAdminLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") ?? "");

    try {
      const response = await fetch("/api/admin/testimonials/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      form.reset();
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-5 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-soft"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Testimonial administration</h1>
        <p className="mt-2 text-sm text-slate-400">
          Sign in to review private testimonial submissions.
        </p>
      </div>

      <label className="block text-sm font-medium text-slate-300">
        Admin password
        <input
          required
          autoFocus
          autoComplete="current-password"
          name="password"
          type="password"
          className="mt-1.5 w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      {error ? (
        <p role="alert" className="rounded-lg border border-rose-800 bg-rose-950/60 p-3 text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </form>
  );
}
