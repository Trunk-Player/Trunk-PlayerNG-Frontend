import { APIUser } from "./APIUser";

export interface RegistrationResponse {
  access_token: string;
  refresh_token: string;
  user: APIUser;
}
