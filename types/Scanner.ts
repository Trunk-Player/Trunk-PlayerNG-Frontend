import { ScanLists } from "types/ScanList";
import { UserProfile } from "types/UserProfile";

export interface Scanner {
  uuid: string;
  owner: UserProfile;
  name: string;
  description?: string;
  isPublic: boolean;
  isCommunityShared: boolean;
  scanlists: ScanLists;
}

export type Scanners = Scanner[];
