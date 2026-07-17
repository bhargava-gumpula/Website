import type { Metadata } from "next";
import { TestimonialAdminPage } from "@/components/TestimonialAdminPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonial Admin | Bhargava Gumpula",
  robots: { index: false, follow: false },
};

export default function PendingTestimonialsAdminPage() {
  return <TestimonialAdminPage view="pending" />;
}
