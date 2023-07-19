import type { ReactNode } from "react";

interface SidebarDesktopProps {
  children: ReactNode;
}

const SidebarDesktop = ({ children }: SidebarDesktopProps) => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-gradient-to-r from-cyan-800 to-cyan-700 pt-5 pb-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default SidebarDesktop;
