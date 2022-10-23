import Head from "next/head";
import classNames from "@/utils/classNames";
import {
  systemDetailsTabs as tabs,
  tgListPagesToShow,
  tgListPagesToShowLeft,
  tgListPagesToShowRight,
  tgListResultsLimit,
} from "@/config/systemDetailsPageConsts";

import { usePageTab } from "@/hooks/usePageTab";
import { useSystemData } from "@/hooks/api/useSystemsData";
import { useTalkgroupsData } from "@/hooks/api/useTalkgroupData";
import { useRouterUUIDParam } from "@/hooks/useRouterUUIDParam";
import { useTgList } from "@/hooks/components/useTgList";

import PageContentContainer from "@/components/PageContentContainer";
import SystemDetails from "@/components/radio/systems/SystemDetails";
import BasicCard from "@/components/cards";
import TableDisplay from "@/components/tables/tableDisplay";
import TalkgroupsList from "@/components/radio/TalkgroupsList";
import Breadcrumbs from "@/components/Breadcrumbs";

import { PlusIcon } from "@heroicons/react/24/solid";

import type { BreadCrumbItems } from "@/types/components/BreadCrumbItem";

const SystemDetailsPage = () => {
  const [currentTab, onChangeCurrentTab] = usePageTab("details");
  const uuid = useRouterUUIDParam();
  const [tgListIsFilterOpen, onTgListIsFilterOpenChange] = useTgList(false);
  const {
    data: systemData,
    error: systemError,
    onRefreshSystem,
  } = useSystemData(uuid);
  const {
    data: talkgroupsData,
    error: talkgroupsError,
    pageIndex: tgListPageIndex,
    onPageIndexChange: onChangeTgListPageIndex,
  } = useTalkgroupsData(0, uuid);

  const crumbs: BreadCrumbItems = [
    { name: "Systems", href: "/systems", current: false },
    { name: systemData ? systemData.name : "System", current: true },
  ];

  return (
    <>
      <Head>
        {!systemData || systemError ? (
          <title>System - Trunk-Player</title>
        ) : (
          <title>{systemData.name} - Trunk-Player</title>
        )}
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageContentContainer>
        <div className="mt-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Breadcrumbs items={crumbs} />
            </div>
            {!systemData && !systemError && <div>Loading System</div>}
            {systemError && (
              <div className="mb-8">
                Error while getting system data.{" "}
                <button
                  className="text-blue-600 underline"
                  onClick={onRefreshSystem}
                >
                  Try Again
                </button>
              </div>
            )}
            {/* TODO: Separate SystemDetails component into separate components on this page. */}
            {systemData && (
              <>
                <SystemDetails
                  key={systemData.UUID}
                  UUID={systemData.UUID}
                  name={systemData.name}
                  rrSystemId={systemData.rr_system_id}
                  pruneTransmissions={systemData.prune_transmissions}
                  pruneTransmissionsAfterDays={
                    systemData.prune_transmissions_after_days
                  }
                  notes={systemData.notes}
                />
                {tabs && (
                  <div>
                    <div className="sm:hidden">
                      <label
                        htmlFor="tabs"
                        className="sr-only"
                      >
                        Select a tab
                      </label>
                      {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                      <select
                        id="tabs"
                        name="tabs"
                        className="block w-full focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                        defaultValue={
                          tabs.find((tab) => tab.id === currentTab)?.name
                        }
                      >
                        {tabs.map((tab) => (
                          <option key={tab.name}>{tab.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="hidden sm:block">
                      <div className="border-b border-gray-200">
                        <nav
                          className="-mb-px flex"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <button
                              key={tab.name}
                              className={classNames(
                                tab.id === currentTab
                                  ? "border-cyan-500 text-cyan-600"
                                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                              )}
                              onClick={onChangeCurrentTab(tab.id)}
                              aria-current={
                                tab.id === currentTab ? "page" : undefined
                              }
                            >
                              {tab.name}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
                {currentTab === "details" && (
                  <>
                    <BasicCard className="mt-5">
                      <BasicCard.CardHeader divider>
                        <div className="flex justify-between items-center">
                          <div>Agencies</div>
                          <div>
                            <PlusIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </BasicCard.CardHeader>
                      <TableDisplay>
                        <TableDisplay.Container>
                          <TableDisplay.Row>No Agencies</TableDisplay.Row>
                        </TableDisplay.Container>
                      </TableDisplay>
                    </BasicCard>
                  </>
                )}
                {currentTab === "talkgroups" && (
                  <div className="mt-6">
                    <TalkgroupsList
                      scrollToTopOfPageOnChange={true}
                      pageIndex={tgListPageIndex}
                      setPageIndex={onChangeTgListPageIndex}
                      talkgroupsAPIData={talkgroupsData}
                      talkgroupsAPIError={talkgroupsError}
                      resultsLimit={tgListResultsLimit}
                      pagesToShow={tgListPagesToShow}
                      pagesToShowLeft={tgListPagesToShowLeft}
                      pagesToShowRight={tgListPagesToShowRight}
                      showFilter={false}
                      isFilterOpen={tgListIsFilterOpen}
                      onIsFilterOpenChange={onTgListIsFilterOpenChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};
export default SystemDetailsPage;
