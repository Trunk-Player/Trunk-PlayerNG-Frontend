import Head from "next/head";
import Link from "next/link";
import MainLayout from "components/layouts/MainLayout";
import PageHeader from "components/headers";
import DashboardHeader from "components/headers/DashboardHeader";
import PageContentContainer from "components/PageContentContainer";
import { Scanners as ScannersType } from "types/temp/Scanner";
import { userAJosland, userWChevin } from "types/temp/dummyData";
import { getFullName } from "utils/userUtils";

const Scanners = () => {
  const scanners: ScannersType = [
    {
      uuid: "a4bb1ae1-531e-485d-bfbd-1ada745b6645",
      name: "Omaha Police Department Dispatch",
      owner: userAJosland,
      description: "All of the OPD dispatch talkgroups.",
      isPublic: true,
      scanlists: [],
    },
    {
      uuid: "da9c21fe-90e3-4d31-bff5-063867a2f2d9",
      name: "Nebraska State Patrol Dispatch",
      owner: userWChevin,
      description: "All NSP troop dispatch talkgroups.",
      isPublic: true,
      scanlists: [],
    },
  ];

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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-b from-cyan-800 to-cyan-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Owner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Scan Lists
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scanners.map((scanner) => (
                  <tr key={scanner.uuid}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
                      <Link href={``}>
                        <a>{scanner.name}</a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getFullName(scanner.owner)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scanner.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {scanner.scanlists.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageContentContainer>
    </MainLayout>
  );
};

export default Scanners;
