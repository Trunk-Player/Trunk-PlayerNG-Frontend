import { ReactNode } from "react";
import classNames from "utils/classNames";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <dl className={classNames("divide-y divide-gray-200", className ?? "")}>
      {children}
    </dl>
  );
};
export default Container;
