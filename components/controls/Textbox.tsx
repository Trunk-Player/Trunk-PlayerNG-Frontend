import classNames from "utils/classNames";

import type { ChangeEventHandler } from "react";

interface TextboxProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Textbox = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: TextboxProps) => {
  return (
    <input
      type="text"
      id={id}
      className={classNames(
        className ?? "",
        "shadow-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full sm:text-sm border-gray-300 rounded-md"
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textbox;
