import { Unit } from "types/api/Unit";

export interface TransmissionUnit {
  UUID: string;
  time: string; // actual type is a date
  unit: Unit;
  pos: number;
  emergency: boolean;
  signal_system?: string;
  tag?: string;
  length: number;
}

export type TransmissionUnits = TransmissionUnit[];
