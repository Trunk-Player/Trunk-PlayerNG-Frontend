import { ReactElement, ReactNode } from "react";
import classNames from "utils/classNames";
import CardHeader from "./CardHeader";

interface BasicCardProps {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
}

type BasicCardComponent = ReactElement & {
  CardHeader?: ReactNode;
};

const BasicCard = ({
  children,
  className,
  dataTestId,
}: BasicCardProps): BasicCardComponent => {
  return (
    <div
      data-testid={dataTestId}
      className={classNames(
        "bg-white px-4 py-5 sm:px-6 overflow-hidden sm:rounded-lg sm:shadow",
        className ?? ""
      )}
    >
      {children}
    </div>
  );
};

BasicCard.CardHeader = CardHeader;

export default BasicCard;
