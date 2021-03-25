import { User } from '.';

export interface UserUpdateRequest extends User {
  password?: string,
  passwordConfirm?: string, // Not actually sent, just used for form purposes
}