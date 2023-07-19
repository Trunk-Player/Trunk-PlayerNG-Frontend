export interface UserProfile {
  UUID: string;
  site_admin: boolean;
  description?: string;
  site_theme?: string;
}

export type UserProfiles = UserProfile[];
