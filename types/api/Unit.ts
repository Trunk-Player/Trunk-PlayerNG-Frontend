import { System } from "types/api/System";

export interface Unit {
  UUID: string;
  system: System;
  decimal_id: number;
  description?: string;
}

export type Units = Unit[];
