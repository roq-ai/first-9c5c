import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FlashCardInterface {
  id?: string;
  english_word: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FlashCardGetQueryInterface extends GetQueryInterface {
  id?: string;
  english_word?: string;
  user_id?: string;
}
