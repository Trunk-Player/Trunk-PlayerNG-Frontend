import SelectMenuSimple from "components/selectMenus/SelectMenuSimple";

import type { Dispatch, SetStateAction } from "react";

interface TalkgroupModeSelectMenuProps {
  value: string;
  onChangeSelection: Dispatch<SetStateAction<string | undefined>>;
}

const TalkgroupModeSelectMenu = ({
  value,
  onChangeSelection,
}: TalkgroupModeSelectMenuProps) => {
  return (
    <SelectMenuSimple
      srText="Select Talkgroup Mode"
      selectedUniqueId={value}
      onChangeSelection={onChangeSelection}
      absoluteMenu={false}
      options={[
        { title: "analog", uniqueId: "analog" },
        { title: "digital", uniqueId: "digital" },
        { title: "mixed", uniqueId: "mixed" },
        { title: "tdma", uniqueId: "tdma" },
      ]}
    />
  );
};
export default TalkgroupModeSelectMenu;
