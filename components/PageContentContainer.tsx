import { ReactNode } from "react";

interface PageContentContainerProps {
  children?: ReactNode;
}

const PageContentContainer = ({ children }: PageContentContainerProps) => {
  return <div className="flex-1 pb-8">{children}</div>;
};

export default PageContentContainer;
