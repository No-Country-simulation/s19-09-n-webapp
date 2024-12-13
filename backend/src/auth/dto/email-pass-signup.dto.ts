import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EmailPasswordSignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  password: string;
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, { message: 'Formato no válido.' })
  name: string;
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, { message: 'Formato no válido.' })
  last_name: string;
}
