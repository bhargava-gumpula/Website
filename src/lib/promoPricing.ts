import { type ClassOffering } from "@/data/siteContent";
import { isGroupClassFreePromoActive } from "@/lib/isPromoActive";

export function getClassPriceBadgeDisplay(classItem: ClassOffering): string | undefined {
  if (!classItem.priceBadge) {
    return undefined;
  }

  if (classItem.format === "Group" && isGroupClassFreePromoActive()) {
    return "Free";
  }

  return classItem.priceBadge;
}

export function getClassPricingDetailDisplay(classItem: ClassOffering): string {
  if (classItem.format === "Group" && isGroupClassFreePromoActive()) {
    return "Free";
  }

  return classItem.detail.pricingDetail;
}
