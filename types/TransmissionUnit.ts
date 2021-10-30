import { Unit } from "./Unit";

export interface TransmissionUnit {
  uuid: string;
  time: Date;
  unit: Unit;
  frequency: number;
  length: number;
}

export type TransmissionUnits = TransmissionUnit[];
