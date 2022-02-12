import { APICities } from "types/api/APICity";

export interface APIAgency {
  UUID: string;
  name: string;
  description?: string;
  city?: APICities;
}

export type APIAgencies = APIAgency[];
