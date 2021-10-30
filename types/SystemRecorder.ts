import { System } from "./System";
import { Talkgroups } from "./Talkgroup";
import { UserProfile } from "./UserProfile";

export interface SystemRecorder {
  uuid: string;
  system: System;
  name: string;
  siteID?: string;
  enabled: boolean;
  user: UserProfile;
  talkgroupsAllowed: Talkgroups;
  talkgroupsDenyed: Talkgroups;
  forwarderWebhookUUID: string;
}

export type SystemRecorders = SystemRecorder[];
