import { City } from "./City";

export interface Agency {
  uuid: string;
  name: string;
  description?: string;
  city: City;
}

export type Agencies = Agency[];
