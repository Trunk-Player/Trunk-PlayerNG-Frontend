import type { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="flex-1 pb-8">{children}</div>;
};

export default Container;
