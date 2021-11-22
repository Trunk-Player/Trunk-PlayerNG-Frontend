import { Navigation } from "types/components/Navigation";
import store, { StoreType } from "state/store";

import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";

export const getPrimaryNavigation = (): Navigation => [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Scanners", href: "#", icon: FolderIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Scan Lists", href: "#", icon: InboxIcon, current: false },
  { name: "Talk Groups", href: "#", icon: InboxIcon, current: false },
];
export const getSecondaryNavigation = (): Navigation => {
  const isAdmin =
    store.getState().user.currentUser?.userProfile.siteAdmin || false;

  return isAdmin
    ? [
        { name: "Admin Settings", href: "#", icon: UsersIcon, current: false },
        { name: "Account Settings", href: "#", icon: CogIcon, current: false },
        { name: "Preferences", href: "#", icon: CogIcon, current: false },
        {
          name: "Help",
          href: "#",
          icon: QuestionMarkCircleIcon,
          current: false,
        },
      ]
    : [
        { name: "Account Settings", href: "#", icon: CogIcon, current: false },
        { name: "Preferences", href: "#", icon: CogIcon, current: false },
        {
          name: `Help - ${isAdmin}`,
          href: "#",
          icon: QuestionMarkCircleIcon,
          current: false,
        },
      ];
};
