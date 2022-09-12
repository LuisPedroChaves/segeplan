import { User } from './user';

export interface ISession {
  id: string;
  usuario: User;
  token: string;
}
