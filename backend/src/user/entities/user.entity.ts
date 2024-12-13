import { OmitType } from '@nestjs/mapped-types';
import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  password?: string;
  is_owner: boolean;
  deleted: boolean;
  @Transform(({ value }) => value as SystemRoles)
  role: SystemRoles;
  remember_token?: string;
  created_at: Date;
  updated_at?: Date;
}

export class UserWithoutPassword extends OmitType(User, ['password']) {
  @Exclude()
  password: string;
}

export enum SystemRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}
