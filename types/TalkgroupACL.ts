import { Talkgroups } from "./Talkgroup";
import { UserProfiles } from "./UserProfile";

export interface TalkgroupACL {
  uuid: string;
  name: string;
  users: UserProfiles;
  allowedTalkgroups: Talkgroups;
  defaultNewUsers: boolean;
  defaultNewTalkgroups: boolean;
}

export type TalkgroupACLs = TalkgroupACL[];
