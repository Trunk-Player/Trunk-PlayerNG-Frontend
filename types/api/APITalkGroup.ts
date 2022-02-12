import { APISystem } from "types/api/APISystem";
import { APIAgencies } from "types/api/APIAgency";

export interface APITalkGroup {
  UUID: string;
  system: APISystem;
  decimalID: number;
  alphaTag?: string;
  description?: string;
  mode: "digital" | "analog" | "tdma";
  encrypted?: boolean;
  agency?: APIAgencies;
}

export type APITalkGroups = APITalkGroup[];
