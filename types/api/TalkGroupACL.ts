import { TalkGroups } from "types/api/TalkGroup";
import { UserProfiles } from "types/api/UserProfile";

export interface TalkGroupACL {
  UUID: string;
  name: string;
  users: UserProfiles;
  allowedTalkgroups: TalkGroups;
  defaultNewUsers: boolean;
  defaultNewTalkgroups: boolean;
  downloadAllowed: boolean;
}

export type TalkGroupACLs = TalkGroupACL[];
