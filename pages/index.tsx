import Head from "next/head";
// import MainLayout from "components/layouts/MainLayout";
import PageHeader from "components/headers";
import DashboardHeader from "components/headers/DashboardHeader";
import PageContentContainer from "components/PageContentContainer";
import BasicCard from "components/cards";
import LinkButton from "components/controls/LinkButton";
import TransmissionPlayer from "components/radio/TransmissionPlayer";
// import { getAPIBaseUrl } from "lib/app/appLib";

import useSWR from "swr";
import fetcher from "utils/fetcher";

import type { ResponseTransmissionsList } from "types/api/responses/ResponseTransmissionsList";
import { Transmission } from "@/types/api/Transmission";


// import CreateNewScanner from "components/ui/CreateNewScanner";
// import CallCard from "components/radio/CallCard";
// import { dataEmergency, dataNormal } from "config/sampleData";

const Home = () => {
  const {
    data: transmissionsData,
    // mutate: transmissionsMutate,
    error: transmissionsError,
  } = useSWR<ResponseTransmissionsList>(
    "/radio/transmission/list?limit=50",
    fetcher
  );

  const baseAudioUrl = "";
  // useMemo(() => {
    //   return getAPIBaseUrl()?.replace(/(\/api|\/apiv1)$/i, "");
    // }, []);

  return (
    <>
      {/* <MainLayout> */}
      <Head>
        <title>Dashboard - Trunk-Player</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageHeader>
        <DashboardHeader />
      </PageHeader>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <h2 className="mt-8 text-lg leading-6 font-medium text-gray-900">
              Scanners
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <CreateNewScanner />
            </div> */}
            {/* <h2 className="mt-8 text-lg leading-6 font-medium text-gray-900">
              Transmissions
            </h2>
            <div className="mt-2">
              <div className="mt-2">
                <CallCard data={dataNormal} />
              </div>
              <div className="mt-2">
                <CallCard data={dataEmergency} />
              </div>
            </div> */}
             {

                <BasicCard className="mt-5"  >
                <BasicCard.CardHeader divider >
                  <span className="flex justify-between">
                    <span>Last 50 Transmissions</span>
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
                    transmissionsData.results.map((transmission: Transmission) => (
                      <TransmissionPlayer
                        key={transmission.UUID}
                        audioBaseUrl={baseAudioUrl}
                        transmission={transmission}
                      />
                    ))}
                </div>
                </BasicCard>
                }
          </div>
        </div>
      </PageContentContainer>
     
    </>
  );
};

export default Home;
