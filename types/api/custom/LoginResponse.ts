import { User } from "types/api/User";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}
