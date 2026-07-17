import { cookies } from "next/headers";
import { TestimonialAdminDashboard } from "@/components/TestimonialAdminDashboard";
import { TestimonialAdminLogin } from "@/components/TestimonialAdminLogin";
import {
  isTestimonialAdminConfigured,
  testimonialAdminCookie,
  verifyTestimonialAdminSession,
} from "@/lib/testimonialAdminAuth";
import { listTestimonials } from "@/lib/testimonials";

type TestimonialAdminPageProps = {
  view: "pending" | "completed";
};

export async function TestimonialAdminPage({ view }: TestimonialAdminPageProps) {
  if (!isTestimonialAdminConfigured()) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
        <div className="rounded-xl border border-amber-800 bg-amber-950/40 p-6">
          <h1 className="text-xl font-bold text-amber-200">Admin access is not configured</h1>
          <p className="mt-2 text-sm leading-relaxed text-amber-300/90">
            Set <code>TESTIMONIALS_ADMIN_PASSWORD</code> and{" "}
            <code>TESTIMONIALS_ADMIN_SESSION_SECRET</code> in the server environment, then restart
            the website.
          </p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const isAuthenticated = verifyTestimonialAdminSession(
    cookieStore.get(testimonialAdminCookie)?.value,
  );

  if (!isAuthenticated) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <TestimonialAdminLogin />
      </div>
    );
  }

  const testimonials = await listTestimonials();
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 md:py-16">
      <TestimonialAdminDashboard initialTestimonials={testimonials} view={view} />
    </div>
  );
}
