import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";

export interface SidebarProps {
  showDesktopSidebar?: boolean;
  showMobileSidebar?: boolean;
}

const Sidebar = ({
  showDesktopSidebar = true,
  showMobileSidebar = true,
}: SidebarProps) => {
  return (
    <>
      {showMobileSidebar && <SidebarMobile />}
      {showDesktopSidebar && <SidebarDesktop />}
    </>
  );
};

export default Sidebar;
