import { UserProfiles } from "types/api/UserProfile";

export interface SystemACL {
  UUID: string;
  name: string;
  users?: UserProfiles;
  public: boolean;
}

export type SystemACLs = SystemACL[];
