export interface AuthResponse {
  email: string;
  accessToken: string;
  _id?: string;
  refreshToken?: string;
}

export interface DBUser {
  _id: string;
  email: string;
  password?: string;
}

export interface AuthDeleteResponse {
  _id: string;
  email: string;
}
