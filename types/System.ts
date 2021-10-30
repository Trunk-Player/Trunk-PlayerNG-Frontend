import { SystemACL } from "./SystemACL";

export interface System {
  uuid: string;
  name: string;
  systemACL: SystemACL;
}

export type Systems = System[];
