import { SystemRecorder } from "./SystemRecorder";
import { System } from "./System";
import { Talkgroup } from "./Talkgroup";
import { Units } from "./Unit";

export interface Transmission {
  uuid: string;
  system: System;
  recorder: SystemRecorder;
  startTime: Date;
  endTime?: Date;
  audioFile?: string;
  talkgroup: Talkgroup;
  encrypted: boolean;
  units: Units;
  frequency: number;
  length?: number;
}

export type Transmissions = Transmission[];
