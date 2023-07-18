import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import type { Navigation } from "@/types/Navigation";

export interface CountItem {
  name: string;
  count: number;
}

export const useNavigation = (
  isAdmin = false,
  countItems: CountItem[] = []
) => {
  const primaryNavigation: Navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon, exact: true },
    { name: "Reports", href: "/reports", icon: ChartBarIcon, exact: false },
    { name: "Systems", href: "/systems", icon: FolderIcon, exact: false },
    { name: "Scanners", href: "/scanners", icon: FolderIcon, exact: false },
    { name: "Scan Lists", href: "#", icon: InboxIcon, exact: false },
    { name: "Talk Groups", href: "/talkgroups", icon: InboxIcon, exact: false },
    {
      name: "Transmissions",
      href: "/transmissions",
      icon: InboxIcon,
      exact: false,
    },
  ].map((item) => {
    const countItem = countItems.find((ci) => ci.name === item.name);
    return countItem ? { ...item, count: countItem.count } : item;
  });

  const secondaryNavigation: Navigation = isAdmin
    ? [
        { name: "Admin Settings", href: "#", icon: UsersIcon, exact: false },
        { name: "Account Settings", href: "#", icon: CogIcon, exact: false },
        { name: "Preferences", href: "#", icon: CogIcon, exact: false },
        {
          name: "Help",
          href: "#",
          icon: QuestionMarkCircleIcon,
          exact: false,
        },
      ]
    : [
        { name: "Account Settings", href: "#", icon: CogIcon, exact: false },
        { name: "Preferences", href: "#", icon: CogIcon, exact: false },
        {
          name: "Help",
          href: "#",
          icon: QuestionMarkCircleIcon,
          exact: false,
        },
      ].map((item) => {
        const countItem = countItems.find((ci) => ci.name === item.name);
        return countItem ? { ...item, count: countItem.count } : item;
      });

  return { primaryNavigation, secondaryNavigation };
};
