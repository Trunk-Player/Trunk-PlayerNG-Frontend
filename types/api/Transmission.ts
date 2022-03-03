import { TransmissionFreqs } from "types/api/TransmissionFreq";
import { TransmissionUnits } from "types/api/TransmissionUnit";
import { TalkGroup } from "types/api/TalkGroup";
import { SystemRecorder } from "types/api/SystemRecorder";
import { System } from "types/api/System";

export interface Transmission {
  UUID: string;
  system: System;
  recorder: SystemRecorder;
  startTime: string; // actual type is a date
  endTime?: string; // actual type is a date
  audioFile: string;
  talkgroup: TalkGroup;
  encrypted: boolean;
  emergency: boolean;
  units?: TransmissionUnits;
  frequencys?: TransmissionFreqs;
  frequency: number;
  length?: number;
  locked: boolean;
  transcript?: string;
}

export type Transmissions = Transmission[];
