import Head from "next/head";
import { useSystemsData } from "@/hooks/api/useSystemsData";

import PageContentContainer from "@/components/PageContentContainer";
import EmptySystems from "@/components/radio/systems/EmptySystems";
import SystemsList from "@/components/radio/systems/SystemsList";
import SystemsListItem from "@/components/radio/systems/SystemsListItem";
import LinkButton from "@/components/controls/LinkButton";
import Breadcrumbs from "@/components/Breadcrumbs";

import type { BreadCrumbItems } from "@/types/components/BreadCrumbItem";

const SystemsListPage = () => {
  const {
    data: systemsData,
    error: systemsError,
    mutate: systemsMutate,
  } = useSystemsData();

  const refreshSystems = () => {
    systemsMutate();
  };

  const crumbs: BreadCrumbItems = [
    { name: "Systems", href: "/systems", current: true },
  ];

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
        <div className="mt-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Breadcrumbs items={crumbs} />
            </div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Systems
              </h2>
              <div>
                <LinkButton
                  buttonType="secondary"
                  href="/systems/create"
                >
                  Create System
                </LinkButton>
              </div>
            </div>
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
                    // TODO: Change out notes for a short description field.
                    notes={system.notes}
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
