import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export interface NavigationItem {
  name: string;
  href: string;
  icon?: ForwardRefExoticComponent<
    SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>
  >;
  exact: boolean;
  count?: number;
}

export type Navigation = NavigationItem[];
