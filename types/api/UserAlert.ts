import { Units } from "types/api/Unit";
import { TalkGroups } from "types/api/TalkGroup";
import { UserProfile } from "types/api/UserProfile";

export interface UserAlert {
  UUID: string;
  user: UserProfile;
  name: string;
  enabled: boolean;
  description?: string;
  webNotification: boolean;
  appRiseNotification: boolean;
  appRiseURLs: string;
  talkgroups?: TalkGroups;
  emergencyOnly: boolean;
  units?: Units;
  title: string;
  body: string;
}

export type UserAlerts = UserAlert[];
