import type { ReactNode } from "react";

interface SearchBarProps {
  children?: ReactNode;
}

const SearchBar = ({ children }: SearchBarProps) => {
  return (
    <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      {children}
    </div>
  );
};

export default SearchBar;
