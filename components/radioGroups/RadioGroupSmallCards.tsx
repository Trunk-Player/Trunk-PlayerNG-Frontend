import { RadioGroup } from "@headlessui/react";
import classNames from "utils/classNames";

import type { Dispatch, SetStateAction } from "react";

interface RadioGroupSmallCardsProps {
  srText?: string;
  selectedUniqueId: string;
  onChangeSelection: Dispatch<SetStateAction<string | undefined>>;
  options: {
    uniqueId: string;
    title: string;
  }[];
}

const RadioGroupSmallCards = ({
  srText,
  selectedUniqueId,
  onChangeSelection,
  options,
}: RadioGroupSmallCardsProps) => {
  return (
    <span>
      <RadioGroup
        value={selectedUniqueId}
        onChange={onChangeSelection}
      >
        {srText && (
          <RadioGroup.Label className="sr-only">{srText}</RadioGroup.Label>
        )}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.uniqueId}
              value={option.uniqueId}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer focus:outline-none",
                  active ? "border-cyan-500 ring-2 ring-cyan-500" : "",
                  //"ring-2 ring-cyan-100" : "border-gray-300",
                  checked ? "border-transparent" : "border-gray-300",
                  //? "ring-2 ring-cyan-500 border-cyan-500"
                  //: "border-gray-300",
                  //"border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                  "bg-white border, rounded-lg shadow-sm p-3 flex"
                )
              }
            >
              <RadioGroup.Label as="span">{option.title}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </span>
  );
};

export default RadioGroupSmallCards;
