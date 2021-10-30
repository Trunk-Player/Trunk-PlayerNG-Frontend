import { Talkgroup } from "./Talkgroup";
import { Units } from "./Unit";

export interface Call {
  uuid: string;
  trunkRecorderID: string;
  startTime: Date;
  endTime?: Date;
  units: Units;
  active: boolean;
  emergency: boolean;
  encrypted: boolean;
  frequency: number;
  phase2: string;
  talkgroup: Talkgroup;
}

export type Calls = Call[];
