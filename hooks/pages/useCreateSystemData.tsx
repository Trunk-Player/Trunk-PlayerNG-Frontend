import { useState } from "react";

export const useCreateSystemData = () => {
  const [systemName, setSystemName] = useState("");

  const changeSystemName = (value: string) => {
    setSystemName(value);
  };

  return { systemName, changeSystemName };
};
