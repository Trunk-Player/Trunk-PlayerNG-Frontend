import Head from "next/head";
import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import classNames from "utils/classNames";
import Skeleton from "react-loading-skeleton";
import fetcher from "utils/fetcher";
import { getAPIBaseUrl } from "lib/app/appLib";
import { useRouterUUIDParam } from "@/hooks/useRouterUUIDParam";

import PageContentContainer from "components/PageContentContainer";
import WarningAlert from "components/alerts/WarningAlert";
import BasicCard from "components/cards";
import TableDisplay from "components/tables/tableDisplay";
import TalkgroupView from "components/radio/TalkgroupView";
import LinkButton from "components/controls/LinkButton";
import TransmissionPlayer from "components/radio/TransmissionPlayer";

import type { TalkGroup } from "types/api/TalkGroup";
import type { ResponseTransmissionsList } from "types/api/responses/ResponseTransmissionsList";
import type { Tabs } from "@/types/ui/Tab";

const tabs: Tabs = [
  {
    id: "details",
    name: "Details",
  },
  {
    id: "transmissions",
    name: "Transmissions",
  },
];

const GetTalkgroupPage = () => {
  const uuid = useRouterUUIDParam();
  const [currentTab, setCurrentTab] = useState("details");

  const baseAudioUrl = useMemo(() => {
    return getAPIBaseUrl()?.replace(/(\/api|\/apiv1)$/i, "");
  }, []);

  const {
    data: talkgroupData,
    mutate: talkgroupMutate,
    error: talkgroupError,
  } = useSWR<TalkGroup>(`/radio/talkgroup/${uuid}`, fetcher);

  const {
    data: transmissionsData,
    // mutate: transmissionsMutate,
    error: transmissionsError,
  } = useSWR<ResponseTransmissionsList>(
    `/radio/talkgroup/${uuid}/transmissions?limit=20`,
    fetcher
  );

  const refreshData = () => {
    talkgroupMutate();
  };

  return (
    <>
      <Head>
        {!talkgroupData || talkgroupError ? (
          <title>Talk Group - Trunk-Player</title>
        ) : (
          <title>
            {talkgroupData.alpha_tag
              ? talkgroupData.alpha_tag
              : talkgroupData.decimal_id}{" "}
            - Trunk-Player
          </title>
        )}
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {talkgroupError && (
              <WarningAlert>
                Error while requesting talk group data.{" "}
                <button
                  className="underline"
                  onClick={refreshData}
                >
                  Try again
                </button>
              </WarningAlert>
            )}
            {!talkgroupData && !talkgroupError && (
              <h1 className="my-8 text-4xl leading-6 font-medium text-gray-900">
                <Skeleton width={200} />
              </h1>
            )}
            {talkgroupData && (
              <>
                <TalkgroupView data={talkgroupData} />
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
                  <BasicCard className="mt-5">
                    <BasicCard.CardHeader divider>
                      Agencies
                    </BasicCard.CardHeader>
                    <TableDisplay>
                      <TableDisplay.Container>
                        {talkgroupData.agency &&
                        talkgroupData.agency.length > 0 ? (
                          talkgroupData.agency.map((agency) => (
                            <TableDisplay.Row
                              key={agency.UUID}
                              hasUpdate
                            >
                              <TableDisplay.Column
                                heading
                                className="font-medium text-cyan-600 hover:text-cyan-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                              >
                                <Link href={`/agencies/${agency.UUID}`}>
                                  {agency.name}
                                </Link>
                              </TableDisplay.Column>
                              <TableDisplay.Column>
                                {agency.description}
                              </TableDisplay.Column>
                            </TableDisplay.Row>
                          ))
                        ) : (
                          <TableDisplay.Row>No Agencies</TableDisplay.Row>
                        )}
                      </TableDisplay.Container>
                    </TableDisplay>
                  </BasicCard>
                )}
                {currentTab === "transmissions" && (
                  <BasicCard className="mt-5">
                    <BasicCard.CardHeader divider>
                      <span className="flex justify-between">
                        <span>Last 20 Transmissions</span>
                        <span className="font-normal text-sm">
                          <LinkButton
                            buttonType="secondary"
                            href={"/"}
                          >
                            See More
                          </LinkButton>
                        </span>
                      </span>
                    </BasicCard.CardHeader>
                    {transmissionsError && (
                      <div className="my-5">
                        Error while getting transmissions!
                      </div>
                    )}
                    <div className="mt-5 flex flex-col gap-y-3">
                      {transmissionsData &&
                        transmissionsData.results.map((transmission) => (
                          <TransmissionPlayer
                            key={transmission.UUID}
                            audioBaseUrl={baseAudioUrl}
                            transmission={transmission}
                          />
                        ))}
                    </div>
                  </BasicCard>
                )}
              </>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default GetTalkgroupPage;
