import { Cities } from "types/api/City";

export interface Agency {
  UUID: string;
  name: string;
  description?: string;
  city?: Cities;
}

export type Agencies = Agency[];
