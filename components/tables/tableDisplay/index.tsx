import { ReactElement, ReactNode } from "react";
import Column from "./Column";
import Container from "./Container";
import Row from "./Row";

interface TableDisplayProps {
  children: ReactNode;
  className?: string;
}

type TypeDisplayComponent = ReactElement & {
  Container?: ReactNode;
  Row?: ReactNode;
  Column?: ReactNode;
};

const TableDisplay = ({
  children,
  className,
}: TableDisplayProps): TypeDisplayComponent => {
  return <div className={className}>{children}</div>;
};

TableDisplay.Container = Container;
TableDisplay.Row = Row;
TableDisplay.Column = Column;

export default TableDisplay;
