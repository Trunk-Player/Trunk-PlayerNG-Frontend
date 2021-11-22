import EnvBadge from "components/EnvBadge";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SidebarContainer from "./SidebarContainer";

const SidebarDesktop = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-gradient-to-r from-cyan-800 to-cyan-700 pt-5 pb-4 overflow-y-auto">
        <SidebarContainer>
          <Logo />
          <EnvBadge />
        </SidebarContainer>
        <Navigation />
      </div>
    </div>
  );
};

export default SidebarDesktop;
