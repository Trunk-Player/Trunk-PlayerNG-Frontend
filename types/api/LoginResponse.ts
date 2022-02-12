import { APIUser } from "./APIUser";

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: APIUser;
}
