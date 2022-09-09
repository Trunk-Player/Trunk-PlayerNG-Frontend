import Link from "next/link";
import { useMemo, useRef } from "react";
import classNames from "utils/classNames";
import Skeleton from "react-loading-skeleton";

import BasicTable from "@/components/tables/basicTable";
import SelectMenuSimple from "@/components/selectMenus/SelectMenuSimple";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import type { ResponseTalkgroupsList } from "types/api/responses/ResponseTalkgroupsList";
import type { ResponseSystemsList } from "@/types/api/responses/ResponseSystemsList";
import type { KeyedMutator } from "swr";

interface TalkgroupsListProps {
  scrollToTopOfPageOnChange: boolean;
  pageIndex: number;
  // eslint-disable-next-line no-unused-vars
  setPageIndex: (index: number) => void;
  showFilter?: boolean;
  isFilterOpen: boolean;
  onIsFilterOpenChange?: (value: boolean) => void;
  // onFilterChange;
  talkgroupsAPIData?: ResponseTalkgroupsList;
  talkgroupsAPIError?: any;
  resultsLimit: number;
  pagesToShow: number;
  pagesToShowLeft: number;
  pagesToShowRight: number;
  systemsData?: ResponseSystemsList;
  systemsError?: any;
  systemsMutate?: KeyedMutator<ResponseSystemsList>;
  selectedSystem?: string;
  onSelectedSystemChange?: (value: string | undefined) => void;
}

const TalkgroupsList = ({
  scrollToTopOfPageOnChange,
  pageIndex,
  setPageIndex,
  showFilter = true,
  isFilterOpen,
  onIsFilterOpenChange,
  talkgroupsAPIData,
  talkgroupsAPIError,
  resultsLimit,
  pagesToShow,
  pagesToShowLeft,
  pagesToShowRight,
  systemsData,
  systemsError,
  systemsMutate,
  selectedSystem,
  onSelectedSystemChange,
}: TalkgroupsListProps) => {
  const refTable = useRef<HTMLTableElement>(null);
  const systemsOptions = useMemo(() => {
    const noSelection = {
      title: "--- No System Selected ---",
      uniqueId: "-1",
    };

    if (systemsData && systemsData.results) {
      const resultsMapped = systemsData.results.map((system) => ({
        title: system.name,
        uniqueId: system.UUID,
      }));

      resultsMapped.unshift(noSelection);

      return resultsMapped;
    } else {
      return [noSelection];
    }
  }, [systemsData]);

  const onGoToPage = (page: number) => {
    setPageIndex(page - 1);
  };

  const onFilterButtonClick = () => {
    if (onIsFilterOpenChange) {
      onIsFilterOpenChange(!isFilterOpen);
    }
  };

  const onSystemsSelectionChanged = (value: string | undefined) => {
    if (onSelectedSystemChange) {
      onSelectedSystemChange(value);
    }
  };

  const refreshSystemsData = () => {
    if (systemsMutate) {
      systemsMutate();
    }
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

  const skeletonNumberOfRows = 4; // How many rows for the loading skeleton
  const skeletonNumberOfCols = 6; // How many columns are in the table

  return (
    <>
      {showFilter && (
        <>
          <div className="mb-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              onClick={onFilterButtonClick}
            >
              <FunnelIcon
                className="-ml-0.5 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Filter
            </button>
          </div>
          {isFilterOpen && (
            <div className="mb-3">
              {!systemsData && !systemsError && (
                <Skeleton
                  width={200}
                  baseColor="#ffffff"
                  highlightColor="#155e75"
                  className="mb-3"
                />
              )}
              {systemsData && (
                <>
                  <div className="flex">
                    <SelectMenuSimple
                      srText="Change system"
                      selectedUniqueId={selectedSystem}
                      onChangeSelection={onSystemsSelectionChanged}
                      options={systemsOptions}
                    />{" "}
                    {systemsMutate && (
                      <button onClick={refreshSystemsData}>
                        <ArrowPathIcon className="w-5 ml-3" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
      <BasicTable
        refTable={refTable}
        className={classNames("table-fixed")}
        Header={
          <>
            <BasicTable.HeaderColumn className="max-w-[150px]">
              <span className="table-cell md:hidden">
                Alpha Tag / ID / Description
              </span>
              <span className="hidden md:table-cell">
                Alpha Tag / Description
              </span>
            </BasicTable.HeaderColumn>
            <BasicTable.HeaderColumn
              alignment="center"
              className="hidden md:table-cell"
            >
              DEC
            </BasicTable.HeaderColumn>
            <BasicTable.HeaderColumn
              alignment="center"
              className="hidden lg:table-cell"
            >
              HEX
            </BasicTable.HeaderColumn>
            <BasicTable.HeaderColumn
              alignment="center"
              className="hidden md:table-cell"
            >
              Encrypted
            </BasicTable.HeaderColumn>
            <BasicTable.HeaderColumn
              alignment="center"
              className="hidden sm:table-cell"
            >
              Mode
            </BasicTable.HeaderColumn>
            <BasicTable.HeaderColumn alignment="center">
              System
            </BasicTable.HeaderColumn>
          </>
        }
        Footer={
          <td colSpan={100}>
            {talkgroupsAPIData && (
              <BasicTable.Pagination
                currentPage={pageIndex + 1}
                count={talkgroupsAPIData.count}
                limit={resultsLimit}
                onGoToPage={onGoToPage}
                onScrollToTopOfTable={onScrollToTopOfTable}
                pagesToShow={pagesToShow}
                pagesToShowLeft={pagesToShowLeft}
                pagesToShowRight={pagesToShowRight}
              />
            )}
          </td>
        }
      >
        {talkgroupsAPIError && (
          <BasicTable.RowError>
            There was a problem requesting talk groups from the server.
          </BasicTable.RowError>
        )}
        {!talkgroupsAPIError && !talkgroupsAPIData && (
          <BasicTable.RowSkeleton
            rows={skeletonNumberOfRows}
            cols={skeletonNumberOfCols}
          />
        )}
        {talkgroupsAPIData &&
          talkgroupsAPIData.results.map((talkgroup, i) => (
            <BasicTable.Row key={talkgroup.UUID}>
              <BasicTable.RowCell
                textSize="none"
                striped={i % 2 === 1}
                grayText={false}
                alignment="none"
                className="max-w-[150px]"
              >
                <div className="flex items-center">
                  <Link
                    href={`/talkgroups/${talkgroup.UUID}`}
                    passHref
                  >
                    <a className="text-sm font-medium text-gray-900 underline">
                      {talkgroup.alpha_tag
                        ? talkgroup.alpha_tag
                        : `{ No Tag; Dec ID: ${talkgroup.decimal_id} }`}
                    </a>
                  </Link>
                  <span className="table-cell md:hidden ml-2 text-[0.65rem] text-gray-500">
                    DEC: {talkgroup.decimal_id}
                  </span>
                </div>
                <div className="text-xs">{talkgroup.description}</div>
              </BasicTable.RowCell>
              <BasicTable.RowCell
                className="hidden md:table-cell"
                striped={i % 2 === 1}
              >
                {talkgroup.decimal_id}
              </BasicTable.RowCell>
              <BasicTable.RowCell
                className="hidden lg:table-cell uppercase"
                striped={i % 2 === 1}
              >
                {talkgroup.decimal_id.toString(16)}
              </BasicTable.RowCell>
              <BasicTable.RowCell
                className="hidden md:table-cell"
                striped={i % 2 === 1}
              >
                {talkgroup.encrypted ? "Yes" : "No"}
              </BasicTable.RowCell>
              <BasicTable.RowCell
                className="hidden sm:table-cell"
                striped={i % 2 === 1}
              >
                {talkgroup.mode}
              </BasicTable.RowCell>
              <BasicTable.RowCell striped={i % 2 === 1}>
                <Link
                  href={`/systems/${talkgroup.system.UUID}`}
                  passHref
                >
                  <a className="text-sm text-gray-600 underline">
                    {talkgroup.system.name}
                  </a>
                </Link>
              </BasicTable.RowCell>
            </BasicTable.Row>
          ))}
      </BasicTable>
    </>
  );
};

export default TalkgroupsList;
