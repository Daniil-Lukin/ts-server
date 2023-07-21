export interface TokenPayloads {
  _id: string;
  email: string;
}

export interface DBToken {
  _id: string;
  user: string;
  refreshToken: string;
}

export interface GenerateTokenResponse {
  accessToken: string;
  refreshToken: string;
}
