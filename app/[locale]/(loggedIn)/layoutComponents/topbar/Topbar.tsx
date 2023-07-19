import type { ReactNode } from "react";

interface TopbarProps {
  children: ReactNode;
}

const Topbar = ({ children }: TopbarProps) => {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      {children}
    </div>
  );
};

export default Topbar;
