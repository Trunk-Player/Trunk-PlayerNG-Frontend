import { Agencies } from "types/api/Agency";
import { Transmissions } from "types/api/Transmission";
import { System } from "types/api/System";

export interface Incident {
  UUID: string;
  active: boolean;
  time: string; // actual type is a date
  system: System;
  transmission?: Transmissions;
  name: string;
  description?: string;
  agency?: Agencies;
}

export type Incidents = Incident[];
