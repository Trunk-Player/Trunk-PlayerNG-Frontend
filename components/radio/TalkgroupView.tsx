import Link from "next/link";
import LinkButton from "components/controls/LinkButton";

import {
  DatabaseIcon,
  FingerPrintIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { TalkGroup } from "types/api/TalkGroup";

interface TalkgroupViewProps {
  data: TalkGroup;
  showEdit?: boolean;
  allowEdit?: boolean;
}

const TalkgroupView = ({
  data,
  showEdit = true,
  allowEdit = true,
}: TalkgroupViewProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start">
      <div className="flex flex-col items-center sm:items-start">
        <h1 className="mt-8 text-4xl leading-6 font-bold text-gray-900">
          {data.alpha_tag ? data.alpha_tag : data.decimal_id}
        </h1>
        <div className="pt-4 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm">
            {data.encrypted ? (
              <span className="flex items-center font-medium text-red-500">
                <LockClosedIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 font-medium text-red-400"
                  aria-hidden="true"
                />{" "}
                Encrypted
              </span>
            ) : (
              <>
                <LockOpenIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />{" "}
                Not Encrypted
              </>
            )}
          </div>
          <div className="mt-2 flex items-center text-sm font-medium text-gray-700">
            <FingerPrintIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
            DEC: {data.decimal_id} - HEX:{" "}
            {data.decimal_id.toString(16).toUpperCase()}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600 text-opacity-70 hover:text-opacity-100">
            <DatabaseIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-grays-500 text-opacity-70 hover:text-opacity-100"
              aria-hidden="true"
            />
            <Link
              href={`/systems/${data.system.UUID}`}
              passHref
            >
              <a className="underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                {data.system.name}
              </a>
            </Link>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500 max-w-md">
          {data.description}
        </p>
        <p className="mt-4 mb-8">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 border border-cyan-800">
            {data.mode}
          </span>
        </p>
      </div>

      {showEdit && (
        <div className="mb-8 sm:mb-0 sm:mt-8">
          {showEdit && allowEdit && (
            <LinkButton
              href={`/talkgroups/${data.UUID}/edit`}
              defaultPadding={false}
              className="px-4 py-2"
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Edit
            </LinkButton>
          )}
          {showEdit && !allowEdit && (
            <LinkButton
              href={`/talkgroups/${data.UUID}/edit`}
              defaultPadding={false}
              className="px-4 py-2"
              enabled={false}
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Edit
            </LinkButton>
          )}
        </div>
      )}
    </div>
  );
};

export default TalkgroupView;
