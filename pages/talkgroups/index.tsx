import Head from "next/head";
// import MainLayout from "components/layouts/MainLayout";
import PageContentContainer from "components/PageContentContainer";
import TalkgroupsList from "components/radio/TalkgroupsList";
import Axios from "utils/axios";
import * as appLib from "lib/app/appLib";

import type { GetServerSideProps } from "next";
import { ResponseTalkgroupsList } from "types/api/responses/ResponseTalkgroupsList";

interface TalkgroupsListPageProps {
  talkgroups?: ResponseTalkgroupsList;
}

const TalkgroupsListPage = ({ talkgroups }: TalkgroupsListPageProps) => {
  return (
    <>
      <Head>
        <title>Talk Groups - Trunk-Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="my-8 text-lg leading-6 font-medium text-gray-900">
              Talk Groups
            </h2>
            <TalkgroupsList
              scrollToTopOfPageOnChange={true}
              talkgroupsFallback={talkgroups}
            />
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};

export default TalkgroupsListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  appLib.setServerAPIBaseUrl(context.req);

  try {
    const accessToken = context.req.cookies["accesstoken"];
    if (accessToken) {
      const response = await Axios.get<ResponseTalkgroupsList>(
        "/radio/talkgroup/list?offset=0&limit=100",
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
    } else {
      console.log(
        "Unable to get talk groups on the server-side as there is no accessToken saved"
      );
      return {
        props: {
          talkgroups: [],
        },
      };
    }
  } catch (err: any) {
    console.log("Unable to get talk groups on the server-side", err.message);
    return {
      props: {},
    };
  }
};
