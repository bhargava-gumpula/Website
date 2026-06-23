"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [selectedClass] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    const params = new URLSearchParams(window.location.search);
    return params.get("class") ?? "";
  });
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
      inquiryType: String(formData.get("inquiryType") ?? ""),
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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {selectedClass ? (
        <p className="rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700">
          Registering interest for: <span className="font-semibold">{selectedClass}</span>
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Name
          <input
            required
            name="name"
            type="text"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Email
          <input
            required
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
          />
        </label>
      </div>

      <label className="text-sm font-medium text-slate-700">
        Inquiry Type
        <select
          name="inquiryType"
          defaultValue={selectedClass ? "Class Registration" : "General Question"}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
        >
          <option>Class Registration</option>
          <option>General Question</option>
          <option>Collaboration</option>
        </select>
      </label>

      <label className="text-sm font-medium text-slate-700">
        Message
        <textarea
          required
          name="message"
          rows={5}
          defaultValue={selectedClass ? `Hi, I want to register for "${selectedClass}".` : ""}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
        />
      </label>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border border-brand-700 bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: "#1666c6", color: "#ffffff", borderColor: "#14509c" }}
        >
          {isSubmitting ? "Sending..." : "Submit Contact Form"}
        </button>
      </div>

      {successMessage ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
      ) : null}
    </form>
  );
}
