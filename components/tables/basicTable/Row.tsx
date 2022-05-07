import { ReactNode } from "react";

interface RowProps {
  children: ReactNode;
}

const Row = ({ children }: RowProps) => {
  return <tr>{children}</tr>;
};

export default Row;
