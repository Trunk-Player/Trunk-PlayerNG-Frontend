import { System } from "types/api/System";
import { Agencies } from "types/api/Agency";

export type TalkgroupMode = "digital" | "analog" | "tdma" | "mixed";

export interface TalkGroup {
  UUID: string;
  system: System;
  decimal_id: number;
  alpha_tag?: string;
  description?: string;
  mode: TalkgroupMode;
  encrypted?: boolean;
  agency?: Agencies;
}

export type TalkGroups = TalkGroup[];
