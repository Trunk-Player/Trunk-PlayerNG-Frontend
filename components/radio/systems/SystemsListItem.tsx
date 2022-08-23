import classNames from "@/utils/classNames";
import Link from "next/link";

export interface SystemsListItemProps {
  UUID: string;
  name: string;
}

const SystemsListItem = ({ UUID, name }: SystemsListItemProps) => {
  return (
    <div
      className={classNames(
        "relative rounded-lg border border-gray-300 bg-white px-6 py-5",
        "shadow-sm flex items-center space-x-3 hover:ring-2 hover:ring-cyan-600",
        "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500"
      )}
    >
      <div className="flex-1 min-w-0">
        <Link
          href={`/systems/${UUID}`}
          passHref
        >
          <a className="focus:outline-none">
            <span
              className="absolute inset-0"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-gray-900">{name}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SystemsListItem;
