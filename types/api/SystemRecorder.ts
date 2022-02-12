import { TalkGroups } from "types/api/TalkGroup";
import { System } from "types/api/System";
import { UserProfile } from "types/api/UserProfile";

export interface SystemRecorder {
  UUID: string;
  system: System;
  name: string;
  siteID?: string;
  enabled: boolean;
  user?: UserProfile;
  talkgroupsAllowed?: TalkGroups;
  talkgroupsDenyed?: TalkGroups;
  forwarderWebhookUUID: string;
}

export type SystemRecorders = SystemRecorder[];
