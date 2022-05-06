import { ReactElement } from "react";
import Pagination from "./Pagination";

interface BasicTableProps {}

type BasicTableComponent = ReactElement & {
  Pagination?: ReactElement;
};

const BasicTable = ({}: BasicTableProps): BasicTableComponent => {
  return <div>Table</div>;
};

BasicTable.Pagination = Pagination;

export default BasicTable;
