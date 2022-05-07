import { MenuAlt1Icon } from "@heroicons/react/outline";
import { MouseEventHandler } from "react";

interface OpenSidebarButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const OpenSidebarButton = ({ onClick }: OpenSidebarButtonProps) => {
  return (
    <button
      type="button"
      className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      onClick={onClick}
    >
      <span className="sr-only">Open sidebar</span>
      <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default OpenSidebarButton;
