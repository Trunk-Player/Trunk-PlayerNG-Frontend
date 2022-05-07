import { ReactNode } from "react";
import classNames from "utils/classNames";

interface ColumnProps {
  children?: ReactNode;
  className?: string;
  defaultPadding?: boolean;
  alignment?: "left" | "center" | "right";
}

const Column = ({
  children,
  className,
  defaultPadding = true,
  alignment = "left",
}: ColumnProps) => {
  let alignmentClass = "";

  switch (alignment) {
    case "left":
      alignmentClass = "text-left";
      break;
    case "center":
      alignmentClass = "text-center";
      break;
    case "right":
      alignmentClass = "text-right";
      break;
  }

  return (
    <th
      scope="col"
      className={classNames(
        className || "",
        defaultPadding ? "px-6 py-3" : "",
        alignmentClass,
        "text-xs font-medium text-white uppercase tracking-wider"
      )}
    >
      {children}
    </th>
  );
};

export default Column;
