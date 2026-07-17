"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredTestimonial, TestimonialStatus } from "@/types/testimonial";

type TestimonialAdminDashboardProps = {
  initialTestimonials: StoredTestimonial[];
  view: "pending" | "completed";
};

const statusClass: Record<TestimonialStatus, string> = {
  pending: "border-amber-800 bg-amber-950/50 text-amber-300",
  approved: "border-emerald-800 bg-emerald-950/50 text-emerald-300",
  rejected: "border-rose-800 bg-rose-950/50 text-rose-300",
};

export function TestimonialAdminDashboard({
  initialTestimonials,
  view,
}: TestimonialAdminDashboardProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setWorkingId(id);
    setError("");

    try {
      const response = await fetch(`/api/admin/testimonials/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        if (response.status === 401) router.refresh();
        throw new Error(data.error || "Unable to update testimonial.");
      }
      setTestimonials((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
        ),
      );
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update testimonial.");
    } finally {
      setWorkingId("");
    }
  }

  async function logout() {
    await fetch("/api/admin/testimonials/logout", { method: "POST" });
    router.refresh();
  }

  const pendingTestimonials = testimonials.filter((item) => item.status === "pending");
  const reviewedTestimonials = testimonials.filter((item) => item.status !== "pending");
  const pendingCount = pendingTestimonials.length;

  function renderCard(testimonial: StoredTestimonial) {
    return (
      <article
        key={testimonial.id}
        className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-100">{testimonial.name}</h2>
            <a
              href={`mailto:${testimonial.email}`}
              className="text-sm text-brand-400 hover:text-brand-700"
            >
              {testimonial.email}
            </a>
          </div>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusClass[testimonial.status]}`}
          >
            {testimonial.status}
          </span>
        </div>

        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Class</dt>
            <dd className="text-slate-300">{testimonial.className}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Public attribution</dt>
            <dd className="text-slate-300">
              {testimonial.anonymous ? "Anonymous" : testimonial.name}
            </dd>
          </div>
        </dl>

        <blockquote className="mt-4 rounded-lg border border-slate-700/70 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-300">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>

        <p className="mt-3 text-xs text-slate-500">
          Submitted {new Date(testimonial.submittedAt).toLocaleString()}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={workingId === testimonial.id || testimonial.status === "approved"}
            onClick={() => updateStatus(testimonial.id, "approved")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={workingId === testimonial.id || testimonial.status === "rejected"}
            onClick={() => updateStatus(testimonial.id, "rejected")}
            className="rounded-lg border border-rose-700 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-950/60 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </article>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-400">Admin</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-100">
            {view === "pending" ? "Testimonials — needs review" : "Testimonials — completed"}
          </h1>
          <p className="mt-2 text-slate-400">
            {pendingCount} pending submission{pendingCount === 1 ? "" : "s"} ·{" "}
            {reviewedTestimonials.length} completed
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-2">
        <Link
          href="/admin/testimonials"
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            view === "pending"
              ? "bg-brand-500 text-slate-950"
              : "border border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
          }`}
        >
          Needs review ({pendingCount})
        </Link>
        <Link
          href="/admin/testimonials/completed"
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            view === "completed"
              ? "bg-brand-500 text-slate-950"
              : "border border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
          }`}
        >
          Completed ({reviewedTestimonials.length})
        </Link>
      </div>

      {error ? (
        <p role="alert" className="rounded-lg border border-rose-800 bg-rose-950/60 p-3 text-sm text-rose-300">
          {error}
        </p>
      ) : null}

      {view === "pending" ? (
        <section className="space-y-4">
          {pendingTestimonials.length === 0 ? (
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-400">
              Nothing waiting for review.
            </div>
          ) : (
            pendingTestimonials.map(renderCard)
          )}
        </section>
      ) : (
        <section className="space-y-4">
          {reviewedTestimonials.length === 0 ? (
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-400">
              No completed reviews yet.
            </div>
          ) : (
            reviewedTestimonials.map(renderCard)
          )}
        </section>
      )}
    </div>
  );
}
