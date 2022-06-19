import { SystemACL } from "types/api/SystemACL";

export interface System {
  UUID: string;
  name: string;
  systemACL: SystemACL;
  enable_talkgroup_acls: boolean;
  prune_transmissions: boolean;
  prune_transmissions_after_days: number;
}

export type Systems = System[];
