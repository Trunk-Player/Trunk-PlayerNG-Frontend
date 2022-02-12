import { APIUserProfile } from "types/api/APIUserProfile";
import { APITalkGroups } from "types/api/APITalkGroup";

export interface APIScanList {
  UUID: string;
  owner: APIUserProfile;
  name: string;
  description?: string;
  public: boolean;
  communityShared: boolean;
  talkgroups: APITalkGroups;
}

export type APIScanLists = APIScanLists[];
