export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  count?: number;
}

export type Navigation = NavigationItem[];
