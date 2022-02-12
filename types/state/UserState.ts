import { AuthenticationToken } from "types/api/custom/AuthenticationToken";
import { User } from "types/api/User";

export interface UserState {
  currentUser?: User | null;
  authenticationToken?: AuthenticationToken;
}
