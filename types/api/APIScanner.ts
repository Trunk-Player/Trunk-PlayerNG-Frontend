import { APIUserProfile } from "types/api/APIUserProfile";
import { APIScanLists } from "types/api/APIScanList";

export interface APIScanner {
  UUID: string;
  owner: APIUserProfile;
  name: string;
  description?: string;
  public: boolean;
  communityShared: boolean;
  scanlists: APIScanLists;
}

export type APIScanners = APIScanner[];
