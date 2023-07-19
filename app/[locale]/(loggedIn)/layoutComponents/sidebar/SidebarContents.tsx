import LogoContainer from "./LogoContainer";
import LogoImage from "./LogoImage";
import LogoText from "./LogoText";
import Navigation from "./Navigation";

const SidebarContents = () => {
  return (
    <>
      <LogoContainer>
        <LogoImage className="h-10 w-auto" />
        <LogoText color="white" />
      </LogoContainer>
      <Navigation />
    </>
  );
};

export default SidebarContents;
