import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProgressInterface {
  id?: string;
  learned_word: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ProgressGetQueryInterface extends GetQueryInterface {
  id?: string;
  learned_word?: string;
  user_id?: string;
}
