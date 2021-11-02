import { Unit } from "./Unit";

export interface TransmissionUnit {
  uuid: string;
  time: Date;
  unit: Unit;
  pos: number;
  emergency: number;
  signal_system: number;
  tag: number;
  length: number;
}

export type TransmissionUnits = TransmissionUnit[];
