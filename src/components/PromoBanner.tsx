"use client";

import { promoBanner } from "@/data/siteContent";
import { isPromoActive } from "@/lib/isPromoActive";

export function PromoBanner() {
  if (!isPromoActive()) {
    return null;
  }

  const segment = `${promoBanner.message} · `;

  return (
    <div className="border-b border-brand-500/30 bg-brand-100/90 text-sm text-brand-400">
      <div className="overflow-hidden py-2.5">
        <div className="promo-marquee-track flex w-max">
          <p className="promo-marquee-content px-4">{segment.repeat(6)}</p>
          <p className="promo-marquee-content px-4" aria-hidden="true">
            {segment.repeat(6)}
          </p>
        </div>
      </div>
    </div>
  );
}
