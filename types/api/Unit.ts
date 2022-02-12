import { System } from "types/api/System";

export interface Unit {
  UUID: string;
  system: System;
  decimalID: number;
  description?: string;
}

export type Units = Unit[];
