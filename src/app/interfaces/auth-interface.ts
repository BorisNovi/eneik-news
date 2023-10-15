export interface TokenResponse {
  access: string | null | undefined;
  refresh: string | null | undefined;
}

export interface TokenVerify {
  access: string | null | undefined;
}
