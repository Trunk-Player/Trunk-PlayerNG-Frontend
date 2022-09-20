import { useState } from "react";

export const usePageTab = (initialPage: string) => {
  const [currentTab, setCurrentTab] = useState(initialPage);

  const onChangeCurrentTab = (currentTab: string) => () => {
    setCurrentTab(currentTab);
  };

  return [currentTab, onChangeCurrentTab] as const;
};
