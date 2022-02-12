import { SystemACL } from "types/api/SystemACL";

export interface System {
  UUID: string;
  name: string;
  systemACL: SystemACL;
  enableTalkGroupACLs: boolean;
  pruneTransmissions: boolean;
  pruneTransmissionsAfterDays: number;
}

export type Systems = System[];
