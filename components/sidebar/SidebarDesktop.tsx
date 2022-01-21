import EnvBadge from "components/EnvBadge";
import LogoImage from "./LogoImage";
import Navigation from "./Navigation";
import LogoContainer from "./LogoContainer";
import LogoText from "./LogoText";

const SidebarDesktop = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-gradient-to-r from-cyan-800 to-cyan-700 pt-5 pb-4 overflow-y-auto">
        <LogoContainer>
          <LogoImage />
          <LogoText color="white" />
          <EnvBadge />
        </LogoContainer>
        <Navigation />
      </div>
    </div>
  );
};

export default SidebarDesktop;
