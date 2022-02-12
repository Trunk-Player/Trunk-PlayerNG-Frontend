import { useEffect, useState } from "react";
import { useAppSelector } from "state/store/hooks";
import { selectCurrentUser } from "state/slices/userSlice";

import { CheckCircleIcon } from "@heroicons/react/solid";
import PlaceholderAvatar from "components/icons/custom/PlaceholderAvatar";

const DashboardHeader = () => {
  const user = useAppSelector(selectCurrentUser);
  const [greetingSubtext, setGreetingSubtext] = useState("day");

  useEffect(() => {
    let tmrTimeOfDay: NodeJS.Timeout;
    let tmrTopOfHour: NodeJS.Timeout;

    const setTimeOfDayText = () => {
      const today = new Date();
      const currentHour = today.getHours();

      if (currentHour < 12) {
        setGreetingSubtext("morning");
      } else if (currentHour < 18) {
        setGreetingSubtext("afternoon");
      } else {
        setGreetingSubtext("evening");
      }
    };

    const setTimeToTopOfHour = () => {
      const now = new Date();
      const topOfHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() + 1,
        0,
        0,
        0
      );

      const diff = topOfHour.getTime() - now.getTime();

      if (diff > 100) {
        tmrTimeOfDay = setTimeout(setTimeOfDayText, diff);
        tmrTopOfHour = setTimeout(setTimeToTopOfHour, diff);
      }
    };

    setTimeOfDayText();
    setTimeToTopOfHour();

    return () => {
      clearTimeout(tmrTimeOfDay);
      clearTimeout(tmrTopOfHour);
    };
  }, []);

  return (
    <>
      <div className="flex-1 min-w-0">
        {/* Profile */}
        <div className="flex items-center">
          {/* {user?.picture ? (
            <img
              src={user.picture}
              className="hidden h-16 w-16 rounded-full sm:block"
              alt="User Profile"
            />
          ) : ( */}
          <span className="hidden h-16 w-16 rounded-full overflow-hidden bg-gray-100 sm:block">
            <PlaceholderAvatar />
          </span>
          {/* )} */}
          <div>
            <div className="flex items-center">
              {/* {user?.picture ? (
                <img
                  src={user.picture}
                  className="h-16 w-16 rounded-full sm:hidden"
                  alt="User Profile"
                />
              ) : ( */}
              <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100 sm:hidden">
                <PlaceholderAvatar />
              </span>
              {/* )} */}
              <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                Good {greetingSubtext}
                {user &&
                  (user.first_name || user.last_name) &&
                  `, ${user?.first_name} ${user?.last_name}`}
                !
              </h1>
            </div>
            <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
              <dt className="sr-only">Account status</dt>
              <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                <CheckCircleIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                Change Me
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Secondary
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Primary
        </button>
      </div>
    </>
  );
};

export default DashboardHeader;
