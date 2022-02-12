export interface UserProfile {
  UUID: string;
  siteAdmin: boolean;
  description?: string;
  siteTheme?: string;
}

export type UserProfiles = UserProfile[];
