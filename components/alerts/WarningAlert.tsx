import { ReactNode } from "react";
import { classNames } from "utils/classNames";

import { XCircleIcon } from "@heroicons/react/solid";

interface WarningAlertProps {
  title?: string;
  border?: boolean;
  children: ReactNode;
}

const WarningAlert = ({
  title,
  children,
  border = true,
}: WarningAlertProps) => {
  return (
    <div
      className={classNames(
        "rounded-md bg-red-50 p-4",
        border ? "border border-red-400" : ""
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0 flex flex-col justify-center">
          <XCircleIcon
            className="h-8 w-8 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex flex-col justify-center">
          {title && <h3 className="text-sm font-bold text-red-800">{title}</h3>}
          <div className="text-sm text-red-700">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default WarningAlert;
