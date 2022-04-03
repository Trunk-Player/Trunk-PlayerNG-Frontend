import useSWR from "swr";
import fetcher from "utils/fetcher";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef, useState } from "react";
import { ResponseTalkgroupsList } from "types/api/responses/ResponseTalkgroupsList";
import { classNames } from "utils/classNames";

import {
  ExclamationIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const resultsLimit = 100; // Number of results to show
const pagesToShowLeft = 3; // Total pages numbers to show on the left of current page
const pagesToShowRight = 3; // Total pages numbers to show on the right of current page
const pagesToShow = pagesToShowLeft + 1 + pagesToShowRight; // Pages on the left, current page, pages on the right (does not count previous/next or first/last page numbers)

interface TalkgroupsListProps {
  scrollToTopOfPageOnChange: boolean;
  talkgroupsFallback?: ResponseTalkgroupsList;
}

interface TablePaginationProps {
  currentPage: number;
  count: number;
  limit: number;
  // eslint-disable-next-line no-unused-vars
  onGoToPage: (page: number) => void;
  onScrollToTopOfTable: () => void;
}

const TablePagination = ({
  currentPage,
  count,
  limit,
  onGoToPage,
  onScrollToTopOfTable,
}: TablePaginationProps) => {
  const totalPages =
    (count / limit) % limit === 0 ? count / limit : Math.ceil(count / limit);

  const goToPage = (page: number) => {
    onGoToPage(page);
    onScrollToTopOfTable();
  };

  const Separator = () => (
    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
      ...
    </span>
  );

  interface PageProps {
    pageNumber: number;
    title?: number;
    active: boolean;
  }

  const Page = ({ pageNumber, active, title }: PageProps) => (
    <button
      className={classNames(
        active
          ? "z-10 bg-cyan-50 border-cyan-500 text-cyan-600"
          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
        "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      )}
      title={title ? title.toString() : undefined}
      onClick={() => goToPage(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {currentPage > 1 ? (
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
        ) : (
          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-gray-100 text-gray-300 cursor-default">
            Previous
          </span>
        )}
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {currentPage * limit - limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {currentPage === totalPages ? count : currentPage * limit}
            </span>{" "}
            of <span className="font-medium">{count}</span> results (
            <a href="#" className="font-medium underline">
              Go to page
            </a>
            )
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {currentPage > 1 ? (
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : (
              <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-200 cursor-default">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
            {totalPages > pagesToShow && currentPage > pagesToShowLeft + 1 && (
              <>
                <Page pageNumber={1} active={currentPage === 1} />
                {currentPage > pagesToShowLeft + 2 && <Separator />}
              </>
            )}
            {totalPages <= pagesToShow &&
              [...Array(pagesToShow)].map((_, i) => (
                <Page
                  key={i + 1}
                  pageNumber={i + 1}
                  active={currentPage === i + 1}
                />
              ))}
            {totalPages > pagesToShow && currentPage <= pagesToShowLeft + 1 && (
              <>
                {[...Array(pagesToShow)].map((_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    active={currentPage === i + 1}
                  />
                ))}
              </>
            )}
            {totalPages > pagesToShow && currentPage > pagesToShowLeft + 1 && (
              <>
                {[...Array(pagesToShowLeft)].map((_, i) => {
                  const iCorrected = i + 1;

                  return (
                    <Page
                      key={(currentPage - i - 2 - currentPage) * -1}
                      title={iCorrected}
                      pageNumber={currentPage + i - pagesToShowLeft}
                      active={
                        currentPage === (currentPage - i - 2 - currentPage) * -1
                      }
                    />
                  );
                })}
                <Page pageNumber={currentPage} active={true} />
              </>
            )}
            {totalPages > pagesToShow &&
              !(currentPage <= pagesToShowLeft + 1) &&
              currentPage < totalPages - pagesToShowRight && (
                <>
                  {[...Array(pagesToShowRight)].map((_, i) => (
                    <Page
                      key={currentPage + i + 1}
                      pageNumber={currentPage + i + 1}
                      active={currentPage === currentPage + i + 1}
                    />
                  ))}
                </>
              )}
            {totalPages > pagesToShow &&
              currentPage < totalPages &&
              currentPage > totalPages - pagesToShowRight - 1 && (
                <>
                  {[...Array(totalPages - currentPage)].map((_, i) => (
                    <Page
                      key={currentPage + i + 1}
                      pageNumber={currentPage + i + 1}
                      active={currentPage === currentPage + i + 1}
                    />
                  ))}
                </>
              )}
            {totalPages > pagesToShow &&
              currentPage < totalPages - pagesToShowRight && (
                <>
                  {currentPage < totalPages - pagesToShowRight - 1 && (
                    <Separator />
                  )}
                  <Page pageNumber={totalPages} active={false} />
                </>
              )}
            {currentPage < totalPages ? (
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            ) : (
              <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-200 cursor-default">
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

const TalkgroupsList = ({
  scrollToTopOfPageOnChange,
  talkgroupsFallback,
}: TalkgroupsListProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const refTable = useRef<HTMLTableElement>(null);
  const { data: talkgroupsData, error: talkgroupsError } =
    useSWR<ResponseTalkgroupsList>(
      `/radio/talkgroup/list?offset=${
        pageIndex * resultsLimit
      }&limit=${resultsLimit}`,
      fetcher,
      {
        fallbackData: talkgroupsFallback,
      }
    );

  const onGoToPage = (page: number) => {
    setPageIndex(page - 1);
  };

  const onScrollToTopOfTable = () => {
    if (scrollToTopOfPageOnChange) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      refTable?.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log("data", talkgroupsData);
  }, [talkgroupsData]);

  const skeletonNumberOfRows = 4; // How many rows for the loading skeleton
  const skeletonNumberOfCols = 4; // How many columns are in the table

  return (
    <table
      ref={refTable}
      className="min-w-full max-w-6xl divide-y divide-gray-200"
    >
      <thead className="bg-gradient-to-b from-cyan-800 to-cyan-700">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            Alpha Tag / Description
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
          >
            Decimal ID
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
          >
            Encrypted
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
          >
            Mode
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
          >
            System
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {talkgroupsError && (
          <tr>
            <td colSpan={100}>
              <div className="bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      There was a problem requesting talk groups from the
                      server.
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
        {!talkgroupsError && !talkgroupsData && (
          <>
            {[...Array(skeletonNumberOfRows)].map((_, i1) => (
              <tr key={i1}>
                {[...Array(skeletonNumberOfCols)].map((_, i2) => (
                  <td key={i2} className="bg-white px-6 py-4">
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))}
          </>
        )}
        {talkgroupsData &&
          talkgroupsData.results.map((talkgroup) => (
            <tr key={talkgroup.UUID}>
              <td className="bg-white px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 underline">
                  <Link href={`/talkgroups/${talkgroup.UUID}`}>
                    <a>
                      {talkgroup.alpha_tag
                        ? talkgroup.alpha_tag
                        : `{ No Tag; Dec ID: ${talkgroup.decimal_id} }`}
                    </a>
                  </Link>
                </div>
                <div className="text-xs">{talkgroup.description}</div>
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {talkgroup.decimal_id}
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {talkgroup.encrypted ? "Yes" : "No"}
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {talkgroup.mode}
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {talkgroup.system.name}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot className="border-none">
        <tr>
          <td colSpan={100}>
            {talkgroupsData && (
              <TablePagination
                currentPage={pageIndex + 1}
                count={talkgroupsData.count}
                limit={resultsLimit}
                onGoToPage={onGoToPage}
                onScrollToTopOfTable={onScrollToTopOfTable}
              />
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TalkgroupsList;
