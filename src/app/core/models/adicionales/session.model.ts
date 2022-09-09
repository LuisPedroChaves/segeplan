import { User } from './user';

export interface ISession {
  id: string;
  user: User;
  token: string;
}
