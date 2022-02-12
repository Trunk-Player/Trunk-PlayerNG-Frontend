import { UserProfile } from "./UserProfile";

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  enabled: boolean;
  userProfile?: UserProfile;
}

export type Users = User[];
