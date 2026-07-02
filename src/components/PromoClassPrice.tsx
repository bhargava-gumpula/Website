"use client";

import type { ClassOffering } from "@/data/siteContent";
import { getClassPriceBadgeDisplay, getClassPricingDetailDisplay } from "@/lib/promoPricing";

type ClassPriceBadgeProps = {
  classItem: ClassOffering;
  className?: string;
};

export function ClassPriceBadge({ classItem, className }: ClassPriceBadgeProps) {
  const badge = getClassPriceBadgeDisplay(classItem);

  if (!badge) {
    return null;
  }

  return <span className={className}>{badge} per session</span>;
}

type ClassPricingDetailProps = {
  classItem: ClassOffering;
  className?: string;
};

export function ClassPricingDetail({ classItem, className }: ClassPricingDetailProps) {
  return <p className={className}>{getClassPricingDetailDisplay(classItem)}</p>;
}
