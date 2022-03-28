import Head from "next/head";
import MainLayout from "components/layouts/MainLayout";
import PageContentContainer from "components/PageContentContainer";
import TransmissionsList from "components/radio/TransmissionsList";
import Axios from "utils/axios";

import type { GetServerSideProps } from "next";
import { Transmissions } from "types/api/Transmission";
import { ResponseTransmissionsList } from "types/api/responses/ResponseTransmissionsList";

interface TransmissionsProps {
  transmissions?: ResponseTransmissionsList;
}

const Transmissions = ({ transmissions }: TransmissionsProps) => {
  return (
    <MainLayout>
      <Head>
        <title>Transmissions - Trunk-Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PageHeader>
        <DashboardHeader />
      </PageHeader> */}
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="my-8 text-lg leading-6 font-medium text-gray-900">
              Transmissions
            </h2>
            <TransmissionsList transmissionsFallback={transmissions} />
          </div>
        </div>
      </PageContentContainer>
    </MainLayout>
  );
};

export default Transmissions;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const accessToken = context.req.cookies["accesstoken"];
    const response = await Axios.get<ResponseTransmissionsList>(
      "/radio/transmission/list",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Transmissions", response.data);

    return {
      props: {
        transmissions: response.data,
      },
    };
  } catch (err: any) {
    console.log("Unable to get transmissions on the server-side", err.message);
    return {
      props: {},
    };
  }
};
