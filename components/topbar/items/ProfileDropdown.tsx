import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "utils/classNames";
import { selectCurrentUser } from "state/slices/userSlice";
import { useAppSelector } from "state/store/hooks";

import { ChevronDownIcon } from "@heroicons/react/solid";

import PlaceholderAvatar from "components/icons/custom/PlaceholderAvatar";

const ProfileDropdown = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
          {/* {user?.picture ? (
            <img
              src={user.picture}
              className="h-8 w-8 rounded-full"
              alt="User Profile"
            />
          ) : ( */}
          <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
            <PlaceholderAvatar />
          </span>
          {/* )} */}
          <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
            <span className="sr-only">Open user menu for </span>
            {`${user?.firstName} ${user?.lastName}`}
          </span>
          <ChevronDownIcon
            className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Account Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Preferences
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Logout
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
