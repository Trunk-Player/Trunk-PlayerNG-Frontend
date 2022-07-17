import { LegacyRef, ReactElement, ReactNode } from "react";
import classNames from "utils/classNames";
import Column from "./Column";
import Pagination from "./Pagination";
import Row from "./Row";
import RowCell from "./RowCell";
import RowError from "./RowError";
import RowSkeleton from "./RowSkeleton";

interface BasicTableProps {
  ref?: LegacyRef<HTMLTableElement>;
  Header: ReactNode;
  children: ReactNode;
  Footer: ReactNode;
  className?: string;
}

type BasicTableComponent = ReactElement & {
  Pagination?: ReactElement;
  HeaderColumn?: ReactElement;
  Row?: ReactElement;
  RowCell?: ReactElement;
  RowSkeleton?: ReactElement;
  RowError?: ReactElement;
};

const BasicTable = ({
  ref,
  Header,
  children,
  Footer,
  className,
}: BasicTableProps): BasicTableComponent => {
  return (
    <table
      ref={ref}
      className={classNames(
        className ? className : "",
        "min-w-full max-w-6xl divide-y divide-gray-200"
      )}
    >
      <thead className="bg-gradient-to-b from-cyan-800 to-cyan-700">
        <tr>{Header}</tr>
      </thead>
      <tbody className="divide-y divide-gray-200">{children}</tbody>
      <tfoot className="border-none">
        <tr>{Footer}</tr>
      </tfoot>
    </table>
  );
};

BasicTable.Pagination = Pagination;
BasicTable.HeaderColumn = Column;
BasicTable.Row = Row;
BasicTable.RowCell = RowCell;
BasicTable.RowSkeleton = RowSkeleton;
BasicTable.RowError = RowError;

export default BasicTable;
