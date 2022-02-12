import { UserProfiles } from "types/UserProfile";

export interface APISystemACL {
  UUID: string;
  name: string;
  users: UserProfiles;
  public: boolean;
}

export type APISystemACLs = APISystemACL[];
