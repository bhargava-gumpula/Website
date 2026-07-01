"use client";

import { promoBanner } from "@/data/siteContent";
import { isPromoActive } from "@/lib/isPromoActive";

function MarqueeGroup({ text, hidden = false }: { text: string; hidden?: boolean }) {
  return (
    <div className="promo-marquee-group" aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} className="promo-marquee-item">
          {text}
        </span>
      ))}
    </div>
  );
}

export function PromoBanner() {
  if (!isPromoActive()) {
    return null;
  }

  const text = `${promoBanner.message} · `;

  return (
    <div className="border-b border-brand-500/30 bg-brand-100/90 text-sm text-brand-400">
      <div className="promo-marquee-viewport py-2.5">
        <div className="promo-marquee-track">
          <MarqueeGroup text={text} />
          <MarqueeGroup text={text} hidden />
        </div>
      </div>
    </div>
  );
}
