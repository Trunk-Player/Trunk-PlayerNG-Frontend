import RadioGroupSmallCards from "../../radioGroups/RadioGroupSmallCards";

import type { Dispatch, SetStateAction } from "react";

interface TalkgroupModeSelectionProps {
  srText?: string;
  selectedUniqueId: string;
  onChangeSelection: Dispatch<SetStateAction<string | undefined>>;
}

const TalkgroupModeSelection = ({
  srText,
  selectedUniqueId,
  onChangeSelection,
}: TalkgroupModeSelectionProps) => {
  return (
    <RadioGroupSmallCards
      srText={srText}
      selectedUniqueId={selectedUniqueId}
      onChangeSelection={onChangeSelection}
      options={[
        { title: "analog", uniqueId: "analog" },
        { title: "digital", uniqueId: "digital" },
        { title: "mixed", uniqueId: "mixed" },
        { title: "tdma", uniqueId: "tdma" },
      ]}
    />
  );
};
export default TalkgroupModeSelection;
