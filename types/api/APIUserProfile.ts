export interface APIUserProfile {
  UUID: string;
  siteAdmin: boolean;
  description?: string;
  siteTheme?: string;
}

export type APIUserProfiles = APIUserProfile[];
