import type { Testimonial } from "@/data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-brand-600">{testimonial.highlight}</p>
      <p className="mt-3 text-sm text-slate-700">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <p className="mt-4 text-sm font-medium text-slate-900">- {testimonial.name}</p>
    </article>
  );
}
