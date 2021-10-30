import { Talkgroups } from "./Talkgroup";
import { UserProfile } from "./UserProfile";

export interface ScanList {
  uuid: string;
  owner: UserProfile;
  name: string;
  description?: string;
  public: boolean;
  talkgroups: Talkgroups;
}

export type ScanLists = ScanList[];
