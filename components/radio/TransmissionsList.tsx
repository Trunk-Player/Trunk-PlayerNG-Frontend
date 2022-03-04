import useSWR from "swr";
import fetcher from "utils/fetcher";
import { Transmissions } from "types/api/Transmission";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ExclamationIcon } from "@heroicons/react/solid";

const TransmissionsList = () => {
  const { data: transmissionsData, error: transmissionsError } =
    useSWR<Transmissions>("/radio/transmission/list", fetcher);

  const skeletonNumberOfRows = 4; // How many rows for the loading skeleton
  const skeletonNumberOfCols = 4; // How many columns are in the table

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gradient-to-b from-cyan-800 to-cyan-700">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
          >
            TalkGroup
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
            Start Time
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
          >
            End Time
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {transmissionsError && (
          <tr>
            <td colSpan={100}>
              <div className="bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      There was a problem requesting scanners from the server.
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
        {!transmissionsError && !transmissionsData && (
          <>
            {[...Array(skeletonNumberOfRows)].map((_, i1) => (
              <tr key={i1}>
                {[...Array(skeletonNumberOfCols)].map((_, i2) => (
                  <td key={i2} className="bg-white px-6 py-4">
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))}
          </>
        )}
        {transmissionsData &&
          transmissionsData.map((transmission) => (
            <tr key={transmission.UUID}>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 underline">
                <Link href={`/talkgroups/${transmission.talkgroup.UUID}`}>
                  <a>{transmission.talkgroup.alphaTag}</a>
                </Link>
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transmission.talkgroup.description}
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <span
                  title={new Date(transmission.startTime).toLocaleString(
                    undefined,
                    {
                      hour12: false,
                    }
                  )}
                >
                  {new Date(transmission.startTime).toLocaleTimeString(
                    undefined,
                    {
                      hour12: false,
                    }
                  )}
                </span>
              </td>
              <td className="bg-white px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {transmission.endTime ? (
                  <span
                    title={new Date(transmission.endTime).toLocaleString(
                      undefined,
                      {
                        hour12: false,
                      }
                    )}
                  >
                    {new Date(transmission.endTime).toLocaleTimeString(
                      undefined,
                      {
                        hour12: false,
                      }
                    )}
                  </span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TransmissionsList;
