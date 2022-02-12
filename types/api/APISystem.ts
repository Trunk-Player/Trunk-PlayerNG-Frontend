import { APISystemACL } from "types/api/APISystemACL";

export interface APISystem {
  UUID: string;
  name: string;
  systemACL: APISystemACL;
  enableTalkGroupACLs: boolean;
  pruneTransmissions: boolean;
  pruneTransmissionsAfterDays: number;
}

export type APISystems = APISystem[];
