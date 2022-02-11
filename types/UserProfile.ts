export interface UserProfile {
  uuid: string;
  siteAdmin: boolean;
  description?: string;
  siteTheme?: string;
}

export type UserProfiles = UserProfile[];
