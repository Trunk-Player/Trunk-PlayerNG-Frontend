import { ReactNode } from "react";

interface LogoContainerProps {
  children?: ReactNode;
}

const LogoContainer = ({ children }: LogoContainerProps) => {
  return <div className="flex items-center flex-shrink-0 px-4">{children}</div>;
};

export default LogoContainer;
