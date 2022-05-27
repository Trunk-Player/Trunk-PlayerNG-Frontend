import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
