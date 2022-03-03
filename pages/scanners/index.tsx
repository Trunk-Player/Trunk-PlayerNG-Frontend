import Head from "next/head";
import MainLayout from "components/layouts/MainLayout";
import PageContentContainer from "components/PageContentContainer";
import ScannersList from "components/radio/ScannersList";

const Scanners = () => {
  return (
    <MainLayout>
      <Head>
        <title>Scanners - Trunk-Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PageHeader>
        <DashboardHeader />
      </PageHeader> */}
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="my-8 text-lg leading-6 font-medium text-gray-900">
              Scanners
            </h2>
            <ScannersList />
          </div>
        </div>
      </PageContentContainer>
    </MainLayout>
  );
};

export default Scanners;
