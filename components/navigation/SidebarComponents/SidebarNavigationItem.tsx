import { NavigationItem } from "types/Navigation";
import classNames from "utils/classNames";

interface SidebarNavigationItemProps {
  item: NavigationItem;
}

const SidebarNavigationItem = ({ item }: SidebarNavigationItemProps) => {
  return (
    <a
      key={item.name}
      href={item.href}
      className={classNames(
        item.current
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
      )}
    >
      {item.icon && (
        <item.icon
          className={classNames(
            item.current
              ? "text-gray-300"
              : "text-gray-400 group-hover:text-gray-300",
            "mr-3 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
      )}
      <span className="flex-1">{item.name}</span>
      {item.count ? (
        <span
          className={classNames(
            item.current
              ? "bg-gray-800"
              : "bg-gray-900 group-hover:bg-gray-800",
            "ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full"
          )}
        >
          {item.count}
        </span>
      ) : null}
    </a>
  );
};

export default SidebarNavigationItem;
