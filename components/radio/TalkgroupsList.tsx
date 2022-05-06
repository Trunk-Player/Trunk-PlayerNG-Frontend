import useSWR from "swr";
import fetcher from "utils/fetcher";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import { ResponseTalkgroupsList } from "types/api/responses/ResponseTalkgroupsList";

import { ExclamationIcon } from "@heroicons/react/solid";

import { FilterIcon } from "@heroicons/react/outline";
import BasicTable from "components/tables/basicTable";

const resultsLimit = 100; // Number of results to show
const pagesToShowLeft = 3; // Total pages numbers to show on the left of current page
const pagesToShowRight = 3; // Total pages numbers to show on the right of current page
const pagesToShow = pagesToShowLeft + 1 + pagesToShowRight; // Pages on the left, current page, pages on the right (does not count previous/next or first/last page numbers)

interface TalkgroupsListProps {
  scrollToTopOfPageOnChange: boolean;
  talkgroupsFallback?: ResponseTalkgroupsList;
}

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
      }&limit=${resultsLimit}&encrypted=true`,
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
    <>
      <div className="mb-2">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <FilterIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Filter
        </button>
      </div>
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
                <BasicTable.Pagination
                  currentPage={pageIndex + 1}
                  count={talkgroupsData.count}
                  limit={resultsLimit}
                  onGoToPage={onGoToPage}
                  onScrollToTopOfTable={onScrollToTopOfTable}
                  pagesToShow={pagesToShow}
                  pagesToShowLeft={pagesToShowLeft}
                  pagesToShowRight={pagesToShowRight}
                />
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default TalkgroupsList;
