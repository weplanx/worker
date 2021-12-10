import { ObjectId } from 'mongodb';

export class Admin {
  _id: ObjectId;
  username: string;
  password: string;
  roles: string[];
  status: boolean;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}
