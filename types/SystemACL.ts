import { UserProfiles } from "./UserProfile";

export interface SystemACL {
  uuid: string;
  name: string;
  users: UserProfiles;
  public: boolean;
}

export type SystemACLs = SystemACL[];
