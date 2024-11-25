import { ApiProperty } from '@nestjs/swagger';

export class SuccessAuthDto {
  @ApiProperty({ example: 'email@example.com' })
  email: string;
  @ApiProperty({ example: 'Name' })
  name: string;
  @ApiProperty({ example: 'LastName' })
  last_name: string;
  @ApiProperty({ example: 'jwtToken' })
  token: string;
}
