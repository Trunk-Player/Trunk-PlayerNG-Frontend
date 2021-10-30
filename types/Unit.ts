import { System } from "./System";

export interface Unit {
  uuid: string;
  system: System;
  decimalID: number;
  description?: string;
}

export type Units = Unit[];
