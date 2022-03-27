export interface AuthenticationState {
  authenticated: boolean;
  authenticationLoading: boolean;
  authenticationError?: string;
  expiration?: string;
}
