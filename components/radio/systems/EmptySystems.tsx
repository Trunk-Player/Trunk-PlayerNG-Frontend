import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const EmptySystems = () => {
  return (
    <Link
      href="/systems/create"
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <PlusIcon
        className="mx-auto h-12 w-12 text-gray-400"
        strokeWidth={1}
      />
      <span className="mt-2 block text-sm font-medium text-gray-900">
        Create a new system
      </span>
    </Link>
  );
};

export default EmptySystems;
