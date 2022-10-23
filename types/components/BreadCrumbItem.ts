export interface BreadCrumbItem {
  name: string;
  href?: string;
  current: boolean;
}

export type BreadCrumbItems = BreadCrumbItem[];
