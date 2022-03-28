import { System } from "types/api/System";
import { Agencies } from "types/api/Agency";

export interface TalkGroup {
  UUID: string;
  system: System;
  decimal_id: number;
  alpha_tag?: string;
  description?: string;
  mode: "digital" | "analog" | "tdma" | "mixed";
  encrypted?: boolean;
  agency?: Agencies;
}

export type TalkGroups = TalkGroup[];
