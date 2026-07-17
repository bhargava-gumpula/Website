import type { PublicTestimonial } from "@/types/testimonial";

type TestimonialCardProps = {
  testimonial: PublicTestimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-sm">
      <p className="text-sm font-semibold text-brand-400">{testimonial.className}</p>
      <blockquote className="mt-3 flex-1 text-base leading-relaxed text-slate-200">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <p className="mt-4 text-sm font-medium text-slate-100">— {testimonial.displayName}</p>
    </article>
  );
}
