import { ScanLists } from "types/ScanList";
import { User } from "types/User";

export interface Scanner {
  uuid: string;
  owner: User;
  name: string;
  description?: string;
  isPublic: boolean;
  scanlists: ScanLists;
}

export type Scanners = Scanner[];
