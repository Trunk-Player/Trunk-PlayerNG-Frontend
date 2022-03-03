import useSWR from "swr";
import fetcher from "utils/fetcher";
import { Scanners } from "types/api/Scanner";
import Link from "next/link";
import { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ExclamationIcon } from "@heroicons/react/solid";

const Table = ({ children }: { children: ReactNode }) => (
  <table className="min-w-full divide-y divide-gray-200">{children}</table>
);

const TableHeader = () => (
  <thead className="bg-gradient-to-b from-cyan-800 to-cyan-700">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
      >
        Name
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
      >
        Description
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
      >
        Scan Lists
      </th>
      <th scope="col" className="relative px-6 py-3">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
);

const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

const ScannersList = () => {
  const { data: scannersData, error: scannersError } = useSWR<Scanners>(
    "/radio/scanner/list",
    fetcher
  );

  if (scannersError)
    return (
      <div className="bg-red-50  p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              There was a problem requesting scanners from the server.
            </p>
          </div>
        </div>
      </div>
    );
  if (!scannersData)
    return (
      <Table>
        <TableHeader />
        <TableBody>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Skeleton />
            </td>
          </tr>
        </TableBody>
      </Table>
    );
  return (
    <Table>
      <TableHeader />
      <TableBody>
        {scannersData.map((scanner) => (
          <tr key={scanner.UUID}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
              <Link href={``}>
                <a>{scanner.name}</a>
              </Link>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {scanner.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
              {scanner.scanlists.length}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScannersList;
