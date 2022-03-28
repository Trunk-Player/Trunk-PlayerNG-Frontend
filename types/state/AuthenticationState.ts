export interface AuthenticationState {
  authenticated: boolean;
  authenticationLoading: boolean;
  authenticationError?: string;
  accessToken?: string;
  accessTokenExpiration?: string;
}
