import IconViewGridAdd from "components/icons/hero/IconViewGridAdd";

const CreateNewScanner = () => {
  return (
    <button
      type="button"
      className="dark:text-white relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <IconViewGridAdd />
      <span className="mt-8 block text-sm font-medium text-gray-900 dark:text-white">
        Create a new scanner
      </span>
    </button>
  );
};

export default CreateNewScanner;
