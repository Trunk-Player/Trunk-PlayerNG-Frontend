import { UserProfile } from "types/api/UserProfile";
import { ScanLists } from "types/api/ScanList";

export interface Scanner {
  UUID: string;
  owner: UserProfile;
  name: string;
  description?: string;
  public: boolean;
  communityShared: boolean;
  scanlists: ScanLists;
}

export type Scanners = Scanner[];
