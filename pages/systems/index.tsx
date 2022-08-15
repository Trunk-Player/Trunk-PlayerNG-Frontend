import Head from "next/head";
import { useSystemsData } from "@/hooks/api/useSystemsData";

import PageContentContainer from "@/components/PageContentContainer";
import EmptySystems from "@/components/radio/systems/EmptySystems";
import SystemsList from "@/components/radio/systems/SystemsList";
import SystemsListItem from "@/components/radio/systems/SystemsListItem";

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
              <div className="mb-8">
                Error while getting systems.{" "}
                <button
                  className="text-blue-600 underline"
                  onClick={refreshSystems}
                >
                  Try Again
                </button>
              </div>
            )}
            {systemsData && systemsData.results.length === 0 && (
              <EmptySystems />
            )}
            {systemsData && systemsData.results.length > 0 && (
              // TODO: Check if systems query is limited, and, if so,
              // handle more than the default limit for the returned results.
              <SystemsList>
                {systemsData.results.map((system) => (
                  <SystemsListItem
                    key={system.UUID}
                    UUID={system.UUID}
                    name={system.name}
                  />
                ))}
              </SystemsList>
            )}
          </div>
        </div>
      </PageContentContainer>
    </>
  );
};
export default SystemsListPage;
