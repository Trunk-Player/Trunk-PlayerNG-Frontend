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
import LinkButton from "components/controls/LinkButton";

import {
  DatabaseIcon,
  FingerPrintIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from "@heroicons/react/solid";

import type { GetServerSideProps } from "next";
import type { TalkGroup } from "types/api/TalkGroup";

interface GetTalkgroupPageProps {
  talkgroup?: TalkGroup;
}

const GetTalkgroupPage = ({ talkgroup }: GetTalkgroupPageProps) => {
  const router = useRouter();
  const { uuid } = router.query;
  const {
    data: talkgroupData,
    mutate: talkgroupMutate,
    error: talkgroupError,
  } = useSWR<TalkGroup>(`/radio/talkgroup/${uuid}`, fetcher, {
    fallbackData: talkgroup,
  });

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
                <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start">
                  <div className="flex flex-col items-center sm:items-start">
                    <h1 className="mt-8 text-4xl leading-6 font-bold text-gray-900">
                      {talkgroupData.alpha_tag
                        ? talkgroupData.alpha_tag
                        : talkgroupData.decimal_id}
                    </h1>
                    <div className="pt-4 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        {talkgroupData.encrypted ? (
                          <>
                            <LockClosedIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />{" "}
                            Encrypted
                          </>
                        ) : (
                          <>
                            <LockOpenIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />{" "}
                            Not Encrypted
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex items-center text-sm font-medium text-gray-700">
                        <FingerPrintIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                        DEC: {talkgroupData.decimal_id} - HEX:{" "}
                        {talkgroupData.decimal_id.toString(16).toUpperCase()}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <DatabaseIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <Link
                          href={`/systems/${talkgroupData.system.UUID}`}
                          passHref
                        >
                          <a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                            {talkgroupData.system.name}
                          </a>
                        </Link>
                      </div>
                    </div>
                    <p className="mt-4 mb-8 text-sm font-medium text-gray-500">
                      {talkgroupData.description}
                    </p>
                  </div>

                  <div className="mb-8 sm:mb-0 sm:mt-8">
                    <LinkButton
                      href={`/talkgroups/${talkgroupData.UUID}/edit`}
                      defaultPadding={false}
                      className="px-4 py-2"
                    >
                      <PencilIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Edit
                    </LinkButton>
                  </div>
                </div>
                <BasicCard>
                  <BasicCard.CardHeader divider>
                    Talkgroup Details
                  </BasicCard.CardHeader>
                  <TableDisplay>
                    <TableDisplay.Container>
                      <TableDisplay.Row hasUpdate>
                        <TableDisplay.Column heading>Mode:</TableDisplay.Column>
                        <TableDisplay.Column>
                          {talkgroupData.mode}
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
              </>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default GetTalkgroupPage;

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

    return {
      props: {
        talkgroup: response.data,
      },
    };
  } catch (err: any) {
    console.log("Unable to get talk group on the server-side", err.message);
    return {
      props: {},
    };
  }
};
