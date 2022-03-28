export interface ResponseRefreshToken {
  CSRF_TOKEN: string;
  access_token: string;
  access_token_expiration: string;
}
