"use client";

import { FormEvent, useState } from "react";

const inputClassName =
  "mt-1 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-brand-500 placeholder:text-slate-500 focus:ring-2";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      inquiryType: "General Question",
      message: String(formData.get("message") ?? "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to submit right now. Please try again.");
      }

      setSuccessMessage(data.message ?? "Thanks! Your message was submitted. I will follow up soon.");
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-300">
          Name
          <input required name="name" type="text" className={inputClassName} />
        </label>
        <label className="text-sm font-medium text-slate-300">
          Email
          <input required name="email" type="email" className={inputClassName} />
        </label>
      </div>

      <label className="text-sm font-medium text-slate-300">
        Message
        <textarea
          required
          name="message"
          rows={5}
          placeholder="How can I help?"
          className={inputClassName}
        />
      </label>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Submit Contact Form"}
        </button>
      </div>

      {successMessage ? (
        <p className="rounded-md border border-emerald-800 bg-emerald-950/60 px-3 py-2 text-sm text-emerald-300">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-md border border-rose-800 bg-rose-950/60 px-3 py-2 text-sm text-rose-300">{errorMessage}</p>
      ) : null}
    </form>
  );
}
