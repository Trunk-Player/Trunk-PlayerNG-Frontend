import { ReactNode } from "react";
import { classNames } from "utils/classNames";

interface ColumnProps {
  children?: ReactNode;
  className?: string;
  heading?: boolean;
  onUpdate?: () => void;
  dataTestId?: string;
}

const Column = ({
  children,
  className,
  onUpdate,
  heading = false,
  dataTestId,
}: ColumnProps) => {
  return heading ? (
    <dt
      data-testid={dataTestId}
      className={classNames(
        className ?? "",
        "text-sm font-medium text-gray-500 flex items-center"
      )}
    >
      {children}
    </dt>
  ) : (
    <dd
      data-testid={dataTestId}
      className={classNames(
        className ?? "",
        "mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2"
      )}
    >
      <span className="flex-grow">{children}</span>
      {onUpdate && (
        <span className="ml-4 flex-shrink-0">
          <button
            type="button"
            className="bg-white rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            onClick={onUpdate}
          >
            Update
          </button>
        </span>
      )}
    </dd>
  );
};

export default Column;
