import { User } from './User';

export interface Auth {
  user: User | null;
  token: string | null;
}
