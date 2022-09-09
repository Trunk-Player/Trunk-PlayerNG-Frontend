import { Fragment, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "utils/classNames";

interface SelectMenuSimpleProps {
  srText?: string;
  selectedUniqueId?: string;
  buttonIcon?: boolean;
  absoluteMenu?: boolean;
  onChangeSelection: (value: string | undefined) => void;
  options?: {
    uniqueId: string;
    title: string;
  }[];
}

const SelectMenuSimple = ({
  srText,
  selectedUniqueId,
  buttonIcon = false,
  absoluteMenu = true,
  onChangeSelection,
  options,
}: SelectMenuSimpleProps) => {
  const selected = useMemo(() => {
    if (options) {
      const defaultIndex: number = options.findIndex(
        (opt) => opt.uniqueId === selectedUniqueId
      );
      return options[defaultIndex];
    } else {
      return undefined;
    }
  }, [options, selectedUniqueId]);

  return (
    <Listbox
      value={selectedUniqueId}
      onChange={onChangeSelection}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">{srText}</Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md">
              <div className="relative z-0 inline-flex shadow-sm rounded-md">
                <Listbox.Button className="relative inline-flex items-center bg-cyan-100 bg-opacity-70 border-[1.5px] border-cyan-500 rounded-md text-sm font-medium text-black hover:bg-opacity-90 focus:outline-none focus:z-10 focus:ring-0 focus:ring-transparent">
                  <div className="relative inline-flex items-center py-2 px-3 border border-transparent rounded-l-md select-none cursor-pointer">
                    {buttonIcon && (
                      <CheckIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    <p className="ml-2.5 text-sm font-medium">
                      {selected ? selected.title : "--- No System Selected ---"}
                    </p>
                  </div>
                  <span className="sr-only">{srText}</span>
                  <ChevronDownIcon
                    className="h-5 w-5 mr-2.5"
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
              <Listbox.Options
                className={classNames(
                  "origin-top-right",
                  absoluteMenu ? "absolute" : "",
                  "z-10 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                )}
              >
                {options &&
                  options.map((option) => (
                    <Listbox.Option
                      key={option.uniqueId}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-cyan-100 bg-cyan-600"
                            : "text-gray-900",
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
