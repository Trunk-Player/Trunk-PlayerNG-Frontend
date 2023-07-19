import type { UserProfile } from "./UserProfile";

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  enabled: boolean;
  userProfile: UserProfile;
}

export type Users = User[];
