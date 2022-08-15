import type { ReactNode } from "react";

export interface SystemsListProps {
  children?: ReactNode;
}

const SystemsList = ({ children }: SystemsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
};

export default SystemsList;
