import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import PageContentContainer from "components/PageContentContainer";
import Axios from "utils/axios";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import Skeleton from "react-loading-skeleton";
import WarningAlert from "components/alerts/WarningAlert";
import BasicCard from "components/cards";
import TableDisplay from "components/tables/tableDisplay";
import * as appLib from "lib/app/appLib";
import SelectMenuSimple from "components/selectMenus/SelectMenuSimple";

import { RefreshIcon } from "@heroicons/react/solid";

import type { GetServerSideProps } from "next";
import type { TalkGroup } from "types/api/TalkGroup";
import type { ResponseSystemsList } from "types/api/responses/ResponseSystemsList";

interface EditTalkgroupPageProps {
  talkgroup?: TalkGroup;
  systems?: ResponseSystemsList;
}

const EditTalkgroupPage = ({ talkgroup, systems }: EditTalkgroupPageProps) => {
  const router = useRouter();
  const { uuid } = router.query;
  const {
    data: talkgroupData,
    mutate: talkgroupMutate,
    error: talkgroupError,
  } = useSWR<TalkGroup>(`/radio/talkgroup/${uuid}`, fetcher, {
    fallbackData: talkgroup,
  });
  const {
    data: systemsData,
    mutate: systemsMutate,
    error: systemsError,
  } = useSWR<ResponseSystemsList>("/radio/system/list", fetcher, {
    fallbackData: systems,
  });

  const [selectedSystem, setSelectedSystem] = useState<string | undefined>();

  const refreshData = () => {
    talkgroupMutate();
  };

  const refreshSystems = () => {
    systemsMutate();
  };

  useEffect(() => {
    setSelectedSystem(talkgroupData ? talkgroupData.system.UUID : undefined);
  }, [talkgroupData]);

  return (
    <>
      <Head>
        {!talkgroupData || talkgroupError ? (
          <title>Edit Talk Group - Trunk-Player</title>
        ) : (
          <title>
            Edit{" "}
            {talkgroupData.alpha_tag
              ? talkgroupData.alpha_tag
              : talkgroupData.decimal_id}{" "}
            Talkgroup - Trunk-Player
          </title>
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {talkgroupError && (
              <WarningAlert>
                Error while requesting talk group data.{" "}
                <button className="underline" onClick={refreshData}>
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
                <h1 className="my-8 text-4xl leading-6 font-medium text-gray-900">
                  Edit{" "}
                  {talkgroupData.alpha_tag
                    ? talkgroupData.alpha_tag
                    : talkgroupData.decimal_id}
                </h1>
                {/* <div className="mb-8">
                  <LinkButton href={`/talkgroups/${talkgroupData.UUID}/edit`}>
                    Edit
                  </LinkButton>
                </div> */}
                <BasicCard>
                  <BasicCard.CardHeader divider>
                    Talkgroup Details
                  </BasicCard.CardHeader>
                  <TableDisplay>
                    <TableDisplay.Container>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          System:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {!systemsData && !systemsError && (
                            <Skeleton width={200} />
                          )}
                          {systemsData && selectedSystem && (
                            <>
                              <div className="flex">
                                <SelectMenuSimple
                                  srText="Change system"
                                  selectedUniqueId={selectedSystem}
                                  onChangeSelection={setSelectedSystem}
                                  options={systemsData.results.map(
                                    (system) => ({
                                      title: system.name,
                                      uniqueId: system.UUID,
                                    })
                                  )}
                                />{" "}
                                <button onClick={refreshSystems}>
                                  <RefreshIcon className="w-5 ml-3" />
                                </button>
                              </div>
                            </>
                          )}
                          {/* {systemsData ? (
                            <select>
                              {systemsData.results.map((system) => (
                                <option
                                  key={system.UUID}
                                  selected={
                                    system.UUID === talkgroupData.system.UUID
                                  }
                                  value={system.UUID}
                                >
                                  {system.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <Link
                              href={`/systems/${talkgroupData.system.UUID}`}
                            >
                              {talkgroupData.system.name}
                            </Link>
                          )} */}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Decimal ID:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {talkgroupData.decimal_id}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Alpha Tag:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {talkgroupData.alpha_tag}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Description:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {talkgroupData.description}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>Mode:</TableDisplay.Column>
                        <TableDisplay.Column>
                          {talkgroupData.mode}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>
                          Encrypted:
                        </TableDisplay.Column>
                        <TableDisplay.Column>
                          {talkgroupData.encrypted ? "Yes" : "No"}
                        </TableDisplay.Column>
                      </TableDisplay.Row>
                    </TableDisplay.Container>
                  </TableDisplay>
                </BasicCard>
                <BasicCard className="mt-5">
                  <BasicCard.CardHeader divider>Agencies</BasicCard.CardHeader>
                  <TableDisplay>
                    <TableDisplay.Container>
                      {talkgroupData.agency &&
                      talkgroupData.agency.length > 0 ? (
                        talkgroupData.agency.map((agency) => (
                          <TableDisplay.Row key={agency.UUID} hasUpdate>
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
              </>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default EditTalkgroupPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  appLib.setServerAPIBaseUrl(context.req);

  try {
    const { uuid } = context.query;
    const accessToken = context.req.cookies["accesstoken"];
    const response = await Axios.get<TalkGroup>(`/radio/talkgroup/${uuid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseSystems = await Axios.get<ResponseSystemsList>(
      "/radio/system/list",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        talkgroup: response.data,
        systems: responseSystems.data,
      },
    };
  } catch (err: any) {
    console.log(
      "Unable to get talk group or systems on the server-side",
      err.message
    );
    return {
      props: {},
    };
  }
};
