import Head from "next/head";
// import MainLayout from "components/layouts/MainLayout";
import PageHeader from "components/headers";
import DashboardHeader from "components/headers/DashboardHeader";
import PageContentContainer from "components/PageContentContainer";
// import CreateNewScanner from "components/ui/CreateNewScanner";
// import CallCard from "components/radio/CallCard";
// import { dataEmergency, dataNormal } from "config/sampleData";

const Home = () => {
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
          </div>
        </div>
      </PageContentContainer>
      {/* </MainLayout> */}
    </>
  );
};

export default Home;
