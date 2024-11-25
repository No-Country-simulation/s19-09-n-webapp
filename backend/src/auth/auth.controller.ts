import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  EmailPasswordLogInDto,
  EmailPasswordSignUpDto,
  SuccessAuthDto,
} from './dto';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { JwtGuardBearer } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: SuccessAuthDto })
  async emailPasswrdRregister(@Body() dto: EmailPasswordSignUpDto) {
    return await this.authService.emailPasswordSignUp(dto);
  }

  @Post('login')
  @ApiOkResponse({ type: SuccessAuthDto })
  async emailPasswordLogin(@Body() dto: EmailPasswordLogInDto) {
    return await this.authService.emailPasswordLogIn(dto);
  }

  @Get('renew')
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessAuthDto })
  @UseGuards(JwtGuardBearer)
  async renewToken(@GetUser('id') userId: string) {
    return await this.authService.renewToken(userId);
  }
}
