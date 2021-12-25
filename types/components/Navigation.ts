export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  exact: boolean;
  count?: number;
}

export type Navigation = NavigationItem[];
