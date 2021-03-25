import { User } from '.';

export interface TokenResponse {
  bearer: string,
  expiresAt: Date
}

export interface UserResponse extends User {
  createdBy: UserResponse,
  createdAt: Date,
}