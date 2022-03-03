import { Navigation } from "types/components/Navigation";
import store from "state/store";

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
  { name: "Dashboard", href: "/", icon: HomeIcon, exact: true },
  { name: "Reports", href: "/reports", icon: ChartBarIcon, exact: false },
  { name: "Scanners", href: "/scanners", icon: FolderIcon, exact: false },
  { name: "Scan Lists", href: "#", icon: InboxIcon, exact: false },
  { name: "Talk Groups", href: "#", icon: InboxIcon, exact: false },
  {
    name: "Transmissions",
    href: "/transmissions",
    icon: InboxIcon,
    exact: false,
  },
];
export const getSecondaryNavigation = (): Navigation => {
  const isAdmin =
    store.getState().user.currentUser?.userProfile.siteAdmin || false;

  return isAdmin
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
      ];
};
