import { APIUserProfiles } from "types/api/APIUserProfile";

export interface APISystemACL {
  UUID: string;
  name: string;
  users: APIUserProfiles;
  public: boolean;
}

export type APISystemACLs = APISystemACL[];
