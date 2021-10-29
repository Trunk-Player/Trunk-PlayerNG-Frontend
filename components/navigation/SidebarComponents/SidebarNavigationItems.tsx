import Item from "components/navigation/SidebarComponents/SidebarNavigationItem";
import { Navigation } from "types/Navigation";

interface SideBarNavigationItemsProps {
  items: Navigation;
}

const SideBarNavigationItems = ({ items }: SideBarNavigationItemsProps) => {
  return (
    <nav
      className="mt-5 flex-1 px-2 bg-gray-800 space-y-1"
      aria-label="Sidebar"
    >
      {items.map((item) => (
        <Item item={item} />
      ))}
    </nav>
  );
};

export default SideBarNavigationItems;

export { Item };
