import Link from "next/link";

import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

import type { BreadCrumbItems } from "@/types/components/BreadCrumbItem";

export interface BreadcrumbsProps {
  items: BreadCrumbItems;
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav
      className="flex"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="flex items-center space-x-4"
      >
        <li>
          <div>
            <Link
              href="/"
              passHref
            >
              <a className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Dashboard</span>
              </a>
            </Link>
          </div>
        </li>
        {items.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {page.href && !page.current ? (
                <Link
                  href={page.href}
                  passHref
                >
                  <a
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.name}
                  </a>
                </Link>
              ) : (
                <span
                  className="ml-4 text-sm font-medium text-gray-500"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
