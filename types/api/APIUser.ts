import { APIUserProfile } from "./APIUserProfile";

export interface APIUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  enabled: boolean;
  userProfile: APIUserProfile;
}
