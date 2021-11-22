import { Fragment, ReactNode } from "react";
import { env } from "config/environment";

const EnvBadge = (): JSX.Element => {
  switch (env) {
    case "development":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white ml-2">
          Dev
        </span>
      );
    case "test":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-300 text-black ml-2">
          Staging
        </span>
      );
    default:
      return <Fragment></Fragment>;
  }
};

export default EnvBadge;
