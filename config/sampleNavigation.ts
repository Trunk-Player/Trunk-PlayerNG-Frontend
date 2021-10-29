import { Navigation } from "types/Navigation";

import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";

export const navigation: Navigation = [
  { name: "Overview", href: "#", icon: HomeIcon, current: true },
  { name: "Scanners", href: "#", icon: FolderIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false, count: 3 },
  { name: "Scan Lists", href: "#", icon: InboxIcon, current: false },
  { name: "Talk Groups", href: "#", icon: InboxIcon, current: false },
  { name: "Admin", href: "#", icon: UsersIcon, current: false },
];
export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
