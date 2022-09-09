import { ReactNode } from "react";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface RowErrorProps {
  children?: ReactNode;
}

const RowError = ({ children }: RowErrorProps) => {
  return (
    <tr>
      <td colSpan={100}>
        <div className="bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{children}</p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RowError;
