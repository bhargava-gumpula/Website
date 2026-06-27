import type { Testimonial } from "@/data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-sm">
      <p className="text-sm font-semibold text-brand-400">{testimonial.highlight}</p>
      <p className="mt-3 text-sm text-slate-300">&ldquo;{testimonial.text}&rdquo;</p>
      <p className="mt-4 text-sm font-medium text-slate-100">- {testimonial.name}</p>
    </article>
  );
}
