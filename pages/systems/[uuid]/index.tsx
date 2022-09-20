import Head from "next/head";
import classNames from "@/utils/classNames";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSystemData } from "@/hooks/api/useSystemsData";
import { useTalkgroupsData } from "@/hooks/api/useTalkgroupData";
import {
  systemDetailsTabs as tabs,
  tgListPagesToShow,
  tgListPagesToShowLeft,
  tgListPagesToShowRight,
  tgListResultsLimit,
} from "@/config/systemDetailsPageConsts";

import PageContentContainer from "@/components/PageContentContainer";
import SystemDetails from "@/components/radio/systems/SystemDetails";
import BasicCard from "@/components/cards";
import TableDisplay from "@/components/tables/tableDisplay";
import TalkgroupsList from "@/components/radio/TalkgroupsList";

import { PlusIcon } from "@heroicons/react/24/solid";

const SystemDetailsPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const [currentTab, setCurrentTab] = useState("details");
  const [tgListPageIndex, setTgListPageIndex] = useState(0);
  const [tgListIsFilterOpen, setTgListIsFilterOpen] = useState(false);
  const {
    data: systemData,
    error: systemError,
    mutate: systemMutate,
  } = useSystemData(uuid);
  const { data: talkgroupsData, error: talkgroupsError } = useTalkgroupsData({
    pageIndex: tgListPageIndex,
    resultsLimit: tgListResultsLimit,
    systemUUID: uuid as string,
  });

  const refreshSystem = () => {
    systemMutate();
  };

  const onTgListIsFilterOpenChange = (value: boolean) => {
    setTgListIsFilterOpen(value);
  };

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
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {!systemData && !systemError && <div>Loading System</div>}
            {systemError && (
              <div className="mb-8">
                Error while getting system data.{" "}
                <button
                  className="text-blue-600 underline"
                  onClick={refreshSystem}
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
                              onClick={() => setCurrentTab(tab.id)}
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
                      setPageIndex={setTgListPageIndex}
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
