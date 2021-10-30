import { Call } from "types/Call";
import { Unit } from "types/Unit";

const UnitDisplay = ({ data }: { data: Unit }) => (
  <a
    href="#"
    className={`underline ${
      // data.encrypted
      //   ? "text-red-500 dark:text-red-400 font-bold"
      //   : "text-blue-800 dark:text-blue-400"
      "text-blue-800 dark:text-blue-400"
    }`}
    onClick={(e) => {
      e.preventDefault();
    }}
  >
    {data.description ? data.description : `(${data.decimalID.toString()})`}
  </a>
);

const AudioCard = ({ data }: { data: Call }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-5 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 sm:px-6 sm:rounded-lg sm:shadow flex justify-between">
      <div>
        <h3 className="text-2xl leading-6 font-medium">
          {data.talkgroup.alphaTag
            ? data.talkgroup.alphaTag
            : `(${data.talkgroup.decimalID})`}
        </h3>
        <h4 className="text-xs mt-2 ml-1">
          System: {data.talkgroup.system.name}
        </h4>
        <h4 className="text-xs mt-2 ml-1">
          Units:{" "}
          {data.units.map((unit, i) => (
            <span>
              {i > 0 ? ", " : ""}
              <UnitDisplay data={unit} />
            </span>
          ))}
        </h4>
      </div>
      <div>Test</div>
    </div>
  );
};

export default AudioCard;
