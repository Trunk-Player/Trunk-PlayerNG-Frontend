import type { Tabs } from "@/types/ui/Tab";

export const tgListResultsLimit = 100; // Number of results to show
export const tgListPagesToShowLeft = 3; // Total pages numbers to show on the left of current page
export const tgListPagesToShowRight = 3; // Total pages numbers to show on the right of current page
export const tgListPagesToShow =
  tgListPagesToShowLeft + 1 + tgListPagesToShowRight; // Pages on the left, current page, pages on the right (does not count previous/next or first/last page numbers)

export const systemDetailsTabs: Tabs = [
  {
    id: "details",
    name: "Details",
  },
  {
    id: "talkgroups",
    name: "Talk Groups",
  },
  {
    id: "transmissions",
    name: "Transmissions",
  },
];
