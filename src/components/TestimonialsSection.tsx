"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { FormSelect } from "@/components/FormSelect";
import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialCard } from "@/components/TestimonialCard";
import type { PublicTestimonial } from "@/types/testimonial";

type TestimonialsSectionProps = {
  classOptions: string[];
  eyebrow: string;
  title: string;
  description: string;
};

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/25";

export function TestimonialsSection({
  classOptions,
  eyebrow,
  title,
  description,
}: TestimonialsSectionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [withTransition, setWithTransition] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTestimonials() {
      try {
        const response = await fetch("/api/testimonials", { cache: "no-store" });
        const data = (await response.json()) as { testimonials?: PublicTestimonial[] };
        if (!cancelled && response.ok && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      } catch {
        // The submission option remains available if testimonials cannot be loaded.
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function computeVisibleCount() {
      setVisibleCount(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    }
    computeVisibleCount();
    window.addEventListener("resize", computeVisibleCount);
    return () => window.removeEventListener("resize", computeVisibleCount);
  }, []);

  // When there are more testimonials than fit, clone the first `visibleCount`
  // slides onto the end so the loop moves forward continuously: after animating
  // into the cloned region we silently jump back to the matching real slide.
  const canLoop = testimonials.length > visibleCount;
  const slides = canLoop ? [...testimonials, ...testimonials.slice(0, visibleCount)] : testimonials;
  const slideIndex = Math.min(activeIndex, Math.max(0, slides.length - visibleCount));

  useEffect(() => {
    if (!canLoop || isPaused) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => index + 1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused, canLoop]);

  // After sliding into the cloned region, snap (without animation) back to the
  // equivalent real slide so the next step keeps moving in the same direction.
  function handleTransitionEnd() {
    if (canLoop && activeIndex >= testimonials.length) {
      setWithTransition(false);
      setActiveIndex(activeIndex - testimonials.length);
    }
  }

  useEffect(() => {
    if (withTransition) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setWithTransition(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [withTransition]);

  function goNext() {
    setActiveIndex((index) => (index >= testimonials.length ? index : index + 1));
  }

  function goPrev() {
    if (!canLoop) return;
    if (activeIndex <= 0) {
      setWithTransition(false);
      setActiveIndex(testimonials.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          setActiveIndex(testimonials.length - 1);
        });
      });
    } else {
      setActiveIndex((index) => index - 1);
    }
  }

  function openForm() {
    setSubmissionError("");
    setSubmissionSuccess("");
    dialogRef.current?.showModal();
  }

  function closeForm() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeForm();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      className: String(formData.get("className") ?? ""),
      text: String(formData.get("text") ?? ""),
      anonymous: false,
      publishConsent: formData.get("publishConsent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your testimonial.");
      }
      form.reset();
      setSubmissionSuccess(
        data.message || "Thank you! Your testimonial was submitted for review.",
      );
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : "Unable to submit your testimonial.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="testimonials" className="scroll-mt-24 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <button
          type="button"
          onClick={openForm}
          className="rounded-lg border border-brand-400 px-4 py-2.5 text-sm font-semibold text-brand-400 transition hover:-translate-y-0.5 hover:bg-brand-50"
        >
          Add a testimonial
        </button>
      </div>

      {isLoading ? (
        <div className="h-48 animate-pulse rounded-xl border border-slate-700 bg-slate-900" />
      ) : testimonials.length > 0 ? (
        <div
          className="group relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="overflow-hidden" aria-live="off">
            <div
              className={`flex ${withTransition ? "transition-transform duration-700 ease-in-out" : ""}`}
              style={{ transform: `translateX(-${slideIndex * (100 / visibleCount)}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="shrink-0 px-2 first:pl-0 last:pr-0"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {canLoop ? (
            <>
              <button
                type="button"
                aria-label="Previous testimonials"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-600 bg-slate-900/90 p-2.5 text-slate-200 opacity-0 shadow-lg transition-opacity duration-300 hover:border-brand-400 hover:text-brand-400 focus-visible:opacity-100 group-hover:opacity-100 sm:-left-3"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M10 3L5 8l5 5" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                onClick={goNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-600 bg-slate-900/90 p-2.5 text-slate-200 opacity-0 shadow-lg transition-opacity duration-300 hover:border-brand-400 hover:text-brand-400 focus-visible:opacity-100 group-hover:opacity-100 sm:-right-3"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-600 bg-slate-900/60 p-6 text-center">
          <p className="font-medium text-slate-200">No testimonials have been published yet.</p>
          <p className="mt-2 text-sm text-slate-400">
            If you have taken a class, you can be the first to share your experience.
          </p>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/80"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Share your experience</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Your submission will be reviewed before appearing publicly.
              </p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              aria-label="Close testimonial form"
              className="rounded-lg border border-slate-700 px-2.5 py-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              Close
            </button>
          </div>

          {submissionSuccess ? (
            <div className="mt-6 space-y-4">
              <p className="rounded-lg border border-emerald-800 bg-emerald-950/60 p-4 text-sm text-emerald-300">
                {submissionSuccess}
              </p>
              <button
                type="button"
                onClick={closeForm}
                className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-brand-400"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-300">
                  Your name
                  <input required maxLength={100} name="name" className={inputClassName} />
                </label>
                <label className="text-sm font-medium text-slate-300">
                  Email
                  <input
                    required
                    maxLength={254}
                    name="email"
                    type="email"
                    className={inputClassName}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-300">
                Class
                <FormSelect required name="className" className="mt-1.5">
                  <option value="">Select a class</option>
                  {classOptions.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </FormSelect>
              </label>

              <label className="block text-sm font-medium text-slate-300">
                Testimonial
                <textarea
                  required
                  maxLength={1000}
                  name="text"
                  rows={5}
                  placeholder="What did you learn or enjoy?"
                  className={inputClassName}
                />
                <span className="mt-1 block text-xs text-slate-500">Maximum 1,000 characters.</span>
              </label>

              <div className="absolute -left-[10000px]" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-300">
                <input
                  required
                  name="publishConsent"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-teal-500"
                />
                <span>
                  I confirm this reflects my experience and give permission for it to be published
                  on this website.
                </span>
              </label>

              <p className="text-xs leading-relaxed text-slate-500">
                Your email is used only to verify or follow up on this testimonial and is never
                displayed publicly.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit testimonial"}
              </button>

              {submissionError ? (
                <p role="alert" className="rounded-lg border border-rose-800 bg-rose-950/60 p-3 text-sm text-rose-300">
                  {submissionError}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </dialog>
    </section>
  );
}
