import { ReactNode } from "react";

interface SidebarNavigationContainerProps {
  children?: ReactNode;
}

const SidebarNavigationContainer = ({
  children,
}: SidebarNavigationContainerProps) => {
  return (
    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      {children}
    </div>
  );
};

export default SidebarNavigationContainer;
