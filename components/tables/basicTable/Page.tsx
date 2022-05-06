import classNames from "utils/classNames";

interface PageProps {
  pageNumber: number;
  title?: number;
  active: boolean;
  // eslint-disable-next-line no-unused-vars
  onGoToPage?: (pageNumber: number) => void;
}

const Page = ({ pageNumber, active, title, onGoToPage }: PageProps) => (
  <button
    className={classNames(
      active
        ? "z-10 bg-cyan-50 border-cyan-500 text-cyan-600"
        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
      "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    )}
    title={title ? title.toString() : undefined}
    onClick={() => (onGoToPage ? onGoToPage(pageNumber) : undefined)}
  >
    {pageNumber}
  </button>
);

export default Page;
