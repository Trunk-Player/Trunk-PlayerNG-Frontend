export interface ResponseLogin {
  CSRF_TOKEN: string;
  access_token_expiration: string;
  refresh_token_expiration: string;
  access_token: string;
}
