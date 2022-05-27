import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

import type { UrlObject } from "url";

declare type Url = string | UrlObject;

interface LinkButtonProps {
  children?: ReactNode;
  href: Url;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const LinkButton = ({ children, href, onClick }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <a
        className="inline-flex cursor-pointer items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
