import { TransmissionFreqs } from "types/api/TransmissionFreq";
import { TransmissionUnits } from "types/api/TransmissionUnit";
import { TalkGroup } from "types/api/TalkGroup";

export interface Transmission {
  UUID: string;
  system: string;
  system_name: string;
  recorder: string;
  start_time: string;
  end_time?: string;
  audio_file: string;
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
