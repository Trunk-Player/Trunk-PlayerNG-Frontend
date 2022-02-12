import { Systems } from "types/api/System";
import { TalkGroups } from "types/api/TalkGroup";

export interface SystemForwarder {
  UUID: string;
  name: string;
  enabled: boolean;
  recorderKey: string;
  remoteURL: string;
  forwardIncidents: boolean;
  forwardedSystems: Systems;
  talkGroupFilter?: TalkGroups;
}

export type SystemForwarders = SystemForwarder[];
