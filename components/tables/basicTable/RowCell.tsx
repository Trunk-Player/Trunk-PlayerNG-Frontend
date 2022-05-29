import { ReactNode } from "react";
import classNames from "utils/classNames";

interface RowCellProps {
  children?: ReactNode;
  className?: string;
  striped?: boolean;
  whiteBg?: boolean;
  grayText?: boolean;
  defaultPadding?: boolean;
  noWrap?: boolean;
  alignment?: "none" | "left" | "center" | "right";
  textSize?:
    | "none"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
}

const RowCell = ({
  children,
  className,
  striped = false,
  whiteBg = true,
  grayText = true,
  defaultPadding = true,
  noWrap = true,
  alignment = "center",
  textSize = "sm",
}: RowCellProps) => {
  let alignmentClass = "";
  let textSizeClass = "";

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

  switch (textSize) {
    case "xs":
      textSizeClass = "text-xs";
      break;
    case "sm":
      textSizeClass = "text-sm";
      break;
    case "lg":
      textSizeClass = "text-lg";
      break;
    case "xl":
      textSizeClass = "text-xl";
      break;
    case "2xl":
      textSizeClass = "text-2xl";
      break;
    case "3xl":
      textSizeClass = "text-3xl";
      break;
    case "4xl":
      textSizeClass = "text-4xl";
      break;
    case "5xl":
      textSizeClass = "text-5xl";
      break;
    case "6xl":
      textSizeClass = "text-6xl";
      break;
    case "7xl":
      textSizeClass = "text-7xl";
      break;
    case "8xl":
      textSizeClass = "text-8xl";
      break;
    case "9xl":
      textSizeClass = "text-9xl";
      break;
  }

  return (
    <td
      className={classNames(
        className || "",
        striped ? "bg-cyan-50 bg-opacity-50" : "",
        whiteBg && !striped ? "bg-white" : "",
        defaultPadding ? "px-6 py-2" : "",
        alignmentClass,
        noWrap ? "whitespace-nowrap" : "",
        textSizeClass,
        grayText ? "text-gray-500" : ""
      )}
    >
      {children}
    </td>
  );
};

export default RowCell;
