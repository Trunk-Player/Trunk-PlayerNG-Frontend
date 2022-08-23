import LinkButton from "@/components/controls/LinkButton";

import { ScissorsIcon, PencilIcon } from "@heroicons/react/solid";

export interface SystemDetailsProps {
  UUID: string;
  name: string;
  rrSystemId?: string;
  pruneTransmissions: boolean;
  pruneTransmissionsAfterDays: number;
  notes?: string;
  showEdit?: boolean;
  allowEdit?: boolean;
  showDelete?: boolean;
  allowDelete?: boolean;
}

const SystemDetails = ({
  UUID,
  name,
  pruneTransmissions,
  pruneTransmissionsAfterDays,
  notes,
  showEdit = true,
  allowEdit = true,
  showDelete = true,
  allowDelete = true,
}: SystemDetailsProps) => {
  const prunedText =
    pruneTransmissions && pruneTransmissionsAfterDays
      ? `Transmissions Pruned After ${pruneTransmissionsAfterDays} ${
          pruneTransmissionsAfterDays === 1 ? "Day" : "Days"
        }`
      : "Transmissions Not Pruned";

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start mb-8">
      <div className="flex flex-col items-center sm:items-start">
        <h1 className="text-4xl leading-6 font-bold text-gray-900">{name}</h1>
        <div className="pt-4 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm font-medium text-gray-700">
            <ScissorsIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
            {prunedText}
          </div>
        </div>
        {notes && (
          <p className="mt-4 text-sm font-medium text-gray-500 max-w-sm">
            {notes}
          </p>
        )}
      </div>
      {(showEdit || showDelete) && (
        <div className="sm:mb-0 flex">
          {showDelete && (
            <LinkButton
              href={allowEdit ? `/systems/${UUID}/delete` : undefined}
              defaultPadding={false}
              className="mx-1 px-4 py-2"
              enabled={allowDelete}
              buttonType="tertiary"
            >
              Delete
            </LinkButton>
          )}
          {showEdit && (
            <LinkButton
              href={allowEdit ? `/systems/${UUID}/edit` : undefined}
              defaultPadding={false}
              className="px-4 py-2"
              enabled={allowEdit}
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

export default SystemDetails;
