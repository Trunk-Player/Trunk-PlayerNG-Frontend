import Head from "next/head";
import MainLayout from "components/layouts/MainLayout";
import PageContentContainer from "components/PageContentContainer";
import TalkgroupsList from "components/radio/TalkgroupsList";
import Axios from "utils/axios";

import type { GetServerSideProps } from "next";
import { ResponseTalkgroupsList } from "types/api/responses/ResponseTalkgroupsList";

interface TransmissionsProps {
  talkgroups?: ResponseTalkgroupsList;
}

const TalkgroupsListPage = ({ talkgroups }: TransmissionsProps) => {
  return (
    <MainLayout>
      <Head>
        <title>Talk Groups - Trunk-Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PageHeader>
    <DashboardHeader />
  </PageHeader> */}
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="my-8 text-lg leading-6 font-medium text-gray-900">
              Talk Groups
            </h2>
            <TalkgroupsList talkgroupsFallback={talkgroups} />
          </div>
        </div>
      </PageContentContainer>
    </MainLayout>
  );
};

export default TalkgroupsListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const accessToken = context.req.cookies["accesstoken"];
    const response = await Axios.get<ResponseTalkgroupsList>(
      "/radio/talkgroup/list?offset=0&limit=10",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        talkgroups: response.data,
      },
    };
  } catch (err: any) {
    console.log("Unable to get talk groups on the server-side", err.message);
    return {
      props: {},
    };
  }
};
