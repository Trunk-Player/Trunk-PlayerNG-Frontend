import { useRef } from "react";
import styles from "styles/components/controls/NumberInput.module.css";

interface NumberInputProps {
  labelText?: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  positiveOnly?: boolean;
  skipNumbers?: number[];
  // eslint-disable-next-line no-unused-vars
  onNumberChange?: (newValue: number) => void;
}

const NumberInput = ({
  labelText,
  value,
  minValue,
  maxValue,
  positiveOnly,
  skipNumbers,
  onNumberChange,
}: NumberInputProps) => {
  const numRef = useRef<HTMLInputElement>(null);

  const goToNumber = (newValue: number | string) => {
    if (typeof newValue === "string" && !/^[-0-9][0-9]*$/.test(newValue)) {
      return;
    }

    if (positiveOnly && newValue < 0) {
      return;
    }

    if (minValue && newValue < minValue) {
      return;
    }

    if (maxValue && newValue > maxValue) {
      return;
    }

    if (
      skipNumbers &&
      ((typeof newValue === "string" &&
        skipNumbers.includes(Number.parseInt(newValue))) ||
        (typeof newValue === "number" && skipNumbers.includes(newValue)))
    ) {
      return;
    }

    if (onNumberChange) {
      onNumberChange(
        typeof newValue === "number" ? newValue : Number.parseInt(newValue)
      );
    }
  };

  return (
    <div className="w-44 flex flex-col">
      {labelText && (
        <label
          htmlFor="custom-input-number"
          className="w-full text-gray-700 text-sm font-semibold"
        >
          {labelText}
        </label>
      )}
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          className=" bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={() => goToNumber(value - 1)}
        >
          <span className="m-auto text-2xl font-thin">-</span>
        </button>
        <input
          type="number"
          ref={numRef}
          className={`${styles.numberinput} outline-none focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 border border-gray-300 focus:ring-0`}
          name="custom-input-number"
          value={value}
          onChange={(e) => {
            goToNumber(e.target.value);
          }}
          onFocus={() => {
            numRef.current?.select();
          }}
          onClick={() => {
            numRef.current?.select();
          }}
        />
        <button
          data-action="increment"
          className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 h-full w-20 rounded-r cursor-pointer outline-none"
          onClick={() => goToNumber(value + 1)}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
