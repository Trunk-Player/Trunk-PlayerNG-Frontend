import type { ReactNode } from "react";

interface SearchBarItemContainerProps {
  children?: ReactNode;
}

const SearchBarItemContainer = ({ children }: SearchBarItemContainerProps) => {
  return <div className="ml-4 flex items-center md:ml-6">{children}</div>;
};

export default SearchBarItemContainer;
