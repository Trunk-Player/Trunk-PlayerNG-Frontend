import CircleCheckIcon from "@/components/icons/custom/wizard/CircleCheckIcon";
import CircleDotIcon from "@/components/icons/custom/wizard/CircleDotIcon";
import EmptyCircleIcon from "@/components/icons/custom/wizard/EmptyCircleIcon";

import type { WizardHeaderItems } from "@/types/components/WizardHeaderItem";
import React from "react";

export interface WizardHeadingStepsProps {
  className?: string;
  items: WizardHeaderItems;
}

const WizardHeadingSteps = ({ className, items }: WizardHeadingStepsProps) => {
  return (
    <div className={className}>
      <div className="md:hidden grid grid-cols-4 gap-x-8 w-fit">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <div className="col-span-1 w-fit justify-self-center self-center">
              {item.state === "Finished" && <CircleCheckIcon />}
              {item.state === "Active" && <CircleDotIcon />}
              {item.state === "Pending" && <EmptyCircleIcon />}
            </div>
            <p className="col-span-3 text-sm text-center text-gray-600 self-center">
              {item.name}
            </p>
            {i < items.length - 1 && (
              <>
                <div className="col-span-1 w-0.5 h-3 bg-indigo-50 justify-self-center" />
                <div className="col-span-3" />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div className="lg:px-24 md:px-6 px-4 md:block hidden">
          <div className="flex items-center justify-center">
            {items.map((item, i) => (
              <React.Fragment key={i}>
                <div>
                  {item.state === "Finished" && <CircleCheckIcon />}
                  {item.state === "Active" && <CircleDotIcon />}
                  {item.state === "Pending" && <EmptyCircleIcon />}
                </div>
                {i < items.length - 1 && (
                  <div className="max-w-[196px] w-full h-0.5 bg-indigo-50" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-center gap-36 md:px-10">
            {items.map((item, i) => {
              let textColor = "text-gray-600";

              switch (item.state) {
                case "Finished":
                  textColor = "text-gray-400";
                  break;
                case "Active":
                  textColor = "text-cyan-600 font-bold";
                  break;
              }

              return (
                <p
                  key={i}
                  className={`w-20 text-sm text-center ${textColor}`}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WizardHeadingSteps;
