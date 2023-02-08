import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

import type { UrlObject } from "url";
import classNames from "utils/classNames";

declare type Url = string | UrlObject;

interface LinkButtonProps {
  children?: ReactNode;
  className?: string;
  defaultPadding?: boolean;
  defaultFontSize?: boolean;
  href?: Url;
  enabled?: boolean;
  buttonType?: "primary" | "secondary" | "tertiary";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const LinkButton = ({
  children,
  className,
  defaultPadding = true,
  defaultFontSize = true,
  href,
  enabled = true,
  buttonType = "primary",
  onClick,
}: LinkButtonProps) => {
  const getButtonStyle = () => {
    switch (buttonType) {
      case "secondary":
        return enabled
          ? "cursor-pointer border border-cyan-600 shadow-sm text-cyan-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          : "cursor-not-allowed border border-cyan-600 border-opacity-60 shadow-sm text-cyan-600 text-opacity-60";
      case "tertiary":
        return enabled
          ? "cursor-pointer text-gray-500 text-opacity-80 hover:text-gray-600"
          : "cursor-not-allowed text-gray-300 bg-opacity-80";
      default:
        return enabled
          ? "cursor-pointer border border-transparent shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          : "cursor-not-allowed border border-transparent shadow-sm text-gray-200 bg-cyan-600 bg-opacity-60";
    }
  };

  return enabled && href ? (
    <Link
      href={href}
      className={classNames(
        className ?? "",
        defaultPadding ? "px-3 py-2" : "",
        defaultFontSize ? "text-sm" : "",
        getButtonStyle(),
        "inline-flex items-center leading-4 font-medium rounded-md"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <span
      className={classNames(
        className ?? "",
        defaultPadding ? "px-3 py-2" : "",
        defaultFontSize ? "text-sm" : "",
        getButtonStyle(),
        "inline-flex items-center leading-4 font-medium rounded-md select-none"
      )}
    >
      {children}
    </span>
  );
};

export default LinkButton;
