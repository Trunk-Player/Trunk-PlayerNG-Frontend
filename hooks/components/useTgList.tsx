import { useState } from "react";

export const useTgList = (initialFilterOpen: boolean) => {
  const [isFilterOpen, setIsFilterOpen] = useState(initialFilterOpen);

  const onIsFilterOpenChange = (value: boolean) => {
    setIsFilterOpen(value);
  };

  return [isFilterOpen, onIsFilterOpenChange] as const;
};
