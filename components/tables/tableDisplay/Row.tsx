import { ReactNode } from "react";
import { classNames } from "utils/classNames";

interface RowProps {
  children: ReactNode;
  className?: string;
  hasUpdate?: boolean;
}

const Row = ({ children, className, hasUpdate = false }: RowProps) => {
  return (
    <div
      className={classNames(
        "py-4 sm:py-5 sm:grid sm:gap-4",
        hasUpdate !== undefined && hasUpdate ? "sm:grid-cols-3" : "",
        className ?? ""
      )}
    >
      {children}
    </div>
  );
};
export default Row;
