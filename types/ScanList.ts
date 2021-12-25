import { Talkgroups } from "./Talkgroup";
import { UserProfile } from "./UserProfile";

export interface ScanList {
  uuid: string;
  owner: UserProfile;
  name: string;
  description?: string;
  isPublic: boolean;
  talkgroups: Talkgroups;
}

export type ScanLists = ScanList[];
