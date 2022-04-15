import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "components/layouts/MainLayout";
import PageContentContainer from "components/PageContentContainer";
import Axios from "utils/axios";

import type { GetServerSideProps } from "next";
import { TalkGroup } from "types/api/TalkGroup";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import Skeleton from "react-loading-skeleton";
import WarningAlert from "components/alerts/WarningAlert";

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
    <MainLayout>
      <Head>
        {(!talkgroupData && !talkgroupError) || talkgroupError ? (
          <title>Talk Groups - Trunk-Player</title>
        ) : (
          <title>Bla - Trunk-Player</title>
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
              //   <div>Error while requesting talk group data.</div>
            )}
            {!talkgroupData && !talkgroupError && (
              <h1 className="my-8 text-4xl leading-6 font-medium text-gray-900">
                <Skeleton width={200} />
              </h1>
            )}
            {talkgroupData && (
              <h1 className="my-8 text-4xl leading-6 font-medium text-gray-900">
                {talkgroupData.alpha_tag
                  ? talkgroupData.alpha_tag
                  : talkgroupData.decimal_id}
              </h1>
            )}
          </div>
        </div>
      </PageContentContainer>
    </MainLayout>
  );
};

export default GetTalkgroupPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { uuid } = context.query;
    const accessToken = context.req.cookies["accesstoken"];
    const response = await Axios.get<TalkGroup>(`/radio/talkgroup/${uuid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data);

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
