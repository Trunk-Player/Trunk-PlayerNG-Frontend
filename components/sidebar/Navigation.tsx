import {
  getPrimaryNavigation,
  getSecondaryNavigation,
} from "config/navigation";
import { useEffect } from "react";
import { selectCurrentUser } from "state/slices/userSlice";
import { useAppSelector } from "state/store/hooks";
import { classNames } from "utils/classNames";

const Navigation = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {}, [currentUser]); // Dummy effect to rerender navigation.

  return (
    <nav
      className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
      aria-label="Sidebar"
    >
      <div className="px-2 space-y-1">
        {getPrimaryNavigation().map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-cyan-900 text-white"
                : "text-white hover:text-white hover:bg-cyan-900",
              "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.icon && (
              <item.icon
                className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                aria-hidden="true"
              />
            )}
            {item.name}
          </a>
        ))}
      </div>
      <div className="mt-6 pt-6">
        <div className="px-2 space-y-1">
          {getSecondaryNavigation().map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
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
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
