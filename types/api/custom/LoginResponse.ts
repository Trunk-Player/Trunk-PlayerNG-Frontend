import { User } from "types/api/User";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
  access_token_expiration: string;
  refresh_token_expiration: string;
}
