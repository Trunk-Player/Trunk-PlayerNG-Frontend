import { AuthenticationToken } from "types/api/AuthenticationToken";
import { User } from "types/User";

export interface UserState {
  currentUser?: User | null;
  authenticationToken?: AuthenticationToken;
}
