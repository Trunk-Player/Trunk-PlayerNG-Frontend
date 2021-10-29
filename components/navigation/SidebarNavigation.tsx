import { Navigation } from "types/Navigation";
import Header from "components/navigation/SidebarComponents/SidebarNavigationHeader";
import Container from "components/navigation/SidebarComponents/SidebarNavigationContainer";
import Items from "components/navigation/SidebarComponents/SidebarNavigationItems";
import Item from "components/navigation/SidebarComponents/SidebarNavigationItem";

interface SidebarNavigationProps {
  items: Navigation;
}

const SidebarNavigation = ({ items }: SidebarNavigationProps) => {
  return (
    <div className="flex-1 flex flex-col bg-gray-800 min-h-screen">
      <Container>
        <Header />
        <Items items={items} />
      </Container>
    </div>
  );
};

export default SidebarNavigation;

export { Container, Header, Items, Item };
