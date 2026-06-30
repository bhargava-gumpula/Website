import type { ClassOffering } from "@/data/siteContent";

const GROUP_MAX = 8;
const ONE_ON_ONE_MAX = 1;

export function getMaxCapacityForClass(classItem: Pick<ClassOffering, "format">): number {
  return classItem.format === "Group" ? GROUP_MAX : ONE_ON_ONE_MAX;
}
