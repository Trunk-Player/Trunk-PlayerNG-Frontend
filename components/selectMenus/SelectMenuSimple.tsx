import { Dispatch, Fragment, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "utils/classNames";

interface SelectMenuSimpleProps {
  srText?: string;
  selectedUniqueId: string;
  onChangeSelection: Dispatch<SetStateAction<string | undefined>>;
  options: {
    uniqueId: string;
    title: string;
  }[];
}

const SelectMenuSimple = ({
  srText,
  selectedUniqueId,
  onChangeSelection,
  options,
}: SelectMenuSimpleProps) => {
  const getDefaultIndex = (): number => {
    try {
      return options.findIndex((opt) => opt.uniqueId === selectedUniqueId);
    } catch {
      return 0;
    }
  };

  const defaultIndex: number = getDefaultIndex();
  const selected = options[defaultIndex];

  return (
    <Listbox value={selectedUniqueId} onChange={onChangeSelection}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">{srText}</Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-cyan-700">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-cyan-700">
                <div className="relative inline-flex items-center bg-cyan-600 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-cyan-600 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:z-10 focus:ring-0 focus:ring-transparent">
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.uniqueId}
                    className={({ active }) =>
                      classNames(
                        active ? "text-cyan-100 bg-cyan-600" : "text-gray-900",
                        "cursor-default select-none relative p-4 text-sm"
                      )
                    }
                    value={option.uniqueId}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-cyan-100" : "text-cyan-600"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenuSimple;
