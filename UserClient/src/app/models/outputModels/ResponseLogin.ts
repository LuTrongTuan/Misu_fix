import { ResponseBase } from './ResponseBase';

export class ResponseLogin extends ResponseBase {
  email!: any;
  user_name!: string;
  user_id!: string;
  token!: string;
}

