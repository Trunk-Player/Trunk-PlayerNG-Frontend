import { ReactNode } from "react";

interface SidebarContainerProps {
  children?: ReactNode;
}

const SidebarContainer = ({ children }: SidebarContainerProps) => {
  return <div className="flex items-center flex-shrink-0 px-4">{children}</div>;
};

export default SidebarContainer;
