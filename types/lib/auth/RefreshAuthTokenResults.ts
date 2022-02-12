import { AuthenticationToken } from "types/api/custom/AuthenticationToken";

export interface RefreshAuthTokenResults {
  isSuccessful: boolean;
  authToken?: AuthenticationToken;
}
