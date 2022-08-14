import Head from "next/head";
import { useSystemsData } from "@/hooks/api/useSystemsData";

import PageContentContainer from "@/components/PageContentContainer";

const SystemsListPage = () => {
  const {
    data: systemsData,
    error: systemsError,
    mutate: systemsMutate,
  } = useSystemsData();

  const refreshSystems = () => {
    systemsMutate();
  };

  return (
    <>
      <Head>
        <title>Systems - Trunk-Player</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <PageContentContainer>
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="my-8 text-lg leading-6 font-medium text-gray-900">
              Systems
            </h2>
            {!systemsData && !systemsError && <div>Loading Systems</div>}
            {systemsError && (
              <div>
                Error while getting systems.{" "}
                <button
                  className="text-blue-600 underline"
                  onClick={refreshSystems}
                >
                  Try Again
                </button>
              </div>
            )}
            {systemsData && (
              <div>
                {systemsData.results.map((system) => (
                  <div key={system.UUID}>{system.name}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};
export default SystemsListPage;
