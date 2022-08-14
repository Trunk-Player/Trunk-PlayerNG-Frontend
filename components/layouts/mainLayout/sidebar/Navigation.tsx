import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { selectCurrentUser } from "state/slices/userSlice";
import { useAppSelector } from "state/store/hooks";
import { classNames } from "utils/classNames";

import {
  getPrimaryNavigation,
  getSecondaryNavigation,
} from "config/navigation";

const Navigation = () => {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);

  const isCurrentHref = (href: string, exact: boolean) =>
    exact ? router.asPath === href : router.asPath.startsWith(href);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [currentUser]); // Dummy effect to rerender navigation.

  return (
    <nav
      className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto scrollbar"
      aria-label="Sidebar"
    >
      <div className="px-2 space-y-1">
        {getPrimaryNavigation().map((item) => (
          <Link
            key={item.name}
            href={item.href}
            passHref
          >
            <a
              className={classNames(
                isCurrentHref(item.href, item.exact)
                  ? "bg-cyan-900 text-white"
                  : "text-white hover:text-white hover:bg-cyan-900",
                "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
              )}
              aria-current={
                isCurrentHref(item.href, item.exact) ? "page" : undefined
              }
            >
              {item.icon && (
                <item.icon
                  className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                  aria-hidden="true"
                />
              )}
              {item.name}
            </a>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-6">
        <div className="px-2 space-y-1">
          {getSecondaryNavigation().map((item) => (
            <Link
              key={item.name}
              href={item.href}
              passHref
            >
              <a
                className={classNames(
                  isCurrentHref(item.href, item.exact)
                    ? "bg-cyan-900 text-white"
                    : "text-white hover:text-white hover:bg-cyan-900",
                  "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                )}
              >
                {item.icon && (
                  <item.icon
                    className="mr-4 h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                )}
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
