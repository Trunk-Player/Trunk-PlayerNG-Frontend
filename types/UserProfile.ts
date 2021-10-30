export interface UserProfile {
  uuid: string;
  user: number;
  enabled: boolean;
  siteAdmin: boolean;
  description?: string;
  siteTheme?: string;
  feedAllowed: boolean;
}

export type UserProfiles = UserProfile[];
