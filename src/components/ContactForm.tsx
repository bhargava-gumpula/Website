"use client";

import { FormEvent, useEffect, useState } from "react";
import { classes } from "@/data/siteContent";

const inquiryTypes = ["Class Registration", "General Question"] as const;
const openClasses = classes.filter((classItem) => classItem.status === "Open");

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<"Class Registration" | "General Question">("General Question");
  const [selectedClass, setSelectedClass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const classFromUrl = new URLSearchParams(window.location.search).get("class");
    if (classFromUrl) {
      setInquiryType("Class Registration");
      setSelectedClass(classFromUrl);
    }
  }, []);

  const isClassRegistration = inquiryType === "Class Registration";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const submittedInquiryType = String(formData.get("inquiryType") ?? "");
    const isClassRegistrationSubmit = submittedInquiryType === "Class Registration";

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      inquiryType: submittedInquiryType,
      registeredClass: isClassRegistrationSubmit ? String(formData.get("registeredClass") ?? "") : "",
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
      setInquiryType("General Question");
      setSelectedClass("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
          value={inquiryType}
          onChange={(event) => setInquiryType(event.target.value as "Class Registration" | "General Question")}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
        >
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      {isClassRegistration ? (
        <label className="text-sm font-medium text-slate-700">
          Class
          <select
            required
            name="registeredClass"
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
          >
            <option value="" disabled>
              Select a class
            </option>
            {openClasses.map((classItem) => (
              <option key={classItem.title} value={classItem.title}>
                {classItem.title}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="text-sm font-medium text-slate-700">
        Message
        <textarea
          required
          name="message"
          rows={5}
          placeholder={
            isClassRegistration
              ? "Share your experience level, preferred schedule, etc."
              : "How can I help?"
          }
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
