import IconViewGridAdd from "components/icons/hero/IconViewGridAdd";

const CreateNewScanner = () => {
  return (
    <>
      <button
        type="button"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-0 focus:border-solid dark:text-white"
      >
        <IconViewGridAdd className="" />
        <span className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Create a New Scanner
        </span>
      </button>
    </>
  );
};

export default CreateNewScanner;
