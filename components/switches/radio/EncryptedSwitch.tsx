import SwitchWithIcon from "../SwitchWithIcon";

import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/solid";

import type { Dispatch, SetStateAction } from "react";

interface EncryptedSwitchProps {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean | undefined>>;
}

const EncryptedSwitch = ({ enabled, setEnabled }: EncryptedSwitchProps) => {
  return (
    <SwitchWithIcon
      enabled={enabled}
      enabledIcon={<LockClosedIcon className="h-3 w-3" />}
      disabledIcon={<LockOpenIcon className="h-3 w-3" />}
      setEnabled={setEnabled}
    />
  );
};

export default EncryptedSwitch;
