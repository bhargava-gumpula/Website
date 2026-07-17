import type { Metadata } from "next";
import { TestimonialAdminPage } from "@/components/TestimonialAdminPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Completed Testimonials | Bhargava Gumpula",
  robots: { index: false, follow: false },
};

export default function CompletedTestimonialsAdminPage() {
  return <TestimonialAdminPage view="completed" />;
}
