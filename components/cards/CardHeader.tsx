import { ReactNode } from "react";
import classNames from "utils/classNames";

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  caption?: ReactNode;
  divider?: boolean;
}

const CardHeader = ({
  children,
  className,
  caption,
  divider,
}: CardHeaderProps) => {
  return (
    <div
      className={classNames(
        divider !== undefined && divider ? "pb-5 border-b border-gray-200" : "",
        className ?? ""
      )}
    >
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {children}
      </h3>
      {caption && (
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{caption}</p>
      )}
    </div>
  );
};
export default CardHeader;
