export interface UserProfile {
  uuid: string;
  siteAdmin: boolean;
  description?: string;
  siteTheme?: string;
  feedAllowed: boolean;
}

export type UserProfiles = UserProfile[];
