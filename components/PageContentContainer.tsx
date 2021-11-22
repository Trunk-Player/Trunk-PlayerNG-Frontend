import { ReactNode } from "react";

interface PageContentContainerProps {
  children?: ReactNode;
}

const PageContentContainer = ({ children }: PageContentContainerProps) => {
  return <main className="flex-1 pb-8">{children}</main>;
};

export default PageContentContainer;
