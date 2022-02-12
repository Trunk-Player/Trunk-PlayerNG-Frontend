import { UserProfile } from "types/api/UserProfile";
import { TalkGroups } from "types/api/TalkGroup";

export interface ScanList {
  UUID: string;
  owner: UserProfile;
  name: string;
  description?: string;
  public: boolean;
  communityShared: boolean;
  talkgroups: TalkGroups;
}

export type ScanLists = ScanLists[];
