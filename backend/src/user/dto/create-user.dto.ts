import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  password?: string;
  @IsOptional()
  @IsString()
  remember_token?: string;
}
