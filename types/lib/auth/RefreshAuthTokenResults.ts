import { AuthenticationToken } from "types/api/AuthenticationToken";

export interface RefreshAuthTokenResults {
  isSuccessful: boolean;
  authToken?: AuthenticationToken;
}
