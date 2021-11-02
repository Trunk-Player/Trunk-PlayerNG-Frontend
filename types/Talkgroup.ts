import { Agency } from "./Agency";
import { System } from "./System";

export interface Talkgroup {
  uuid: string;
  system: System;
  decimalID: number;
  alphaTag?: string;
  commonName?: string; // Possibly deprecated
  description?: string;
  encrypted: boolean;
  agency: Agency;
}

export type Talkgroups = Talkgroup[];
