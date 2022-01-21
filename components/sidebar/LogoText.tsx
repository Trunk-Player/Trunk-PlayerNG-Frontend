import { useMemo } from "react";

interface LogoTextProps {
  color: "white" | "black";
}

const LogoText = ({ color = "white" }: LogoTextProps) => {
  let cssColor = useMemo(() => {
    switch (color) {
      case "white":
        return "text-white";
      case "black":
        return "text-black";
      default:
        return "text-white";
    }
  }, [color]);
  return <span className={`${cssColor} font-bold text-xl`}>Trunk-Player</span>;
};

export default LogoText;
