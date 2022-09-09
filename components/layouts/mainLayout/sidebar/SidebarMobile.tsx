import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "state/store/hooks";

import {
  selectMobileNavbarOpen,
  setMobileNavbarOpen,
} from "state/slices/layoutSlice";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface SidebarMobileProps {
  children: ReactNode;
}

const SidebarMobile = ({ children }: SidebarMobileProps) => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectMobileNavbarOpen);

  const setSidebarOpen = (value: boolean) => {
    dispatch(setMobileNavbarOpen(value));
  };

  return (
    <Transition.Root
      show={sidebarOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gradient-to-r from-cyan-800 to-cyan-700">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Transition.Child>
            {children}
          </div>
        </Transition.Child>
        <div
          className="flex-shrink-0 w-14"
          aria-hidden="true"
        >
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SidebarMobile;
