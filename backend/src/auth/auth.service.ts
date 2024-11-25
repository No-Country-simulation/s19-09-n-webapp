import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import {
  EmailPasswordLogInDto,
  EmailPasswordSignUpDto,
  SuccessAuthDto,
} from './dto';
import { UserService } from 'src/user/user.service';
import { comparePassword, hashPassword } from 'src/common';
import { JwtPayload } from './types/jwt-payload.type';
import { User, UserWithoutPassword } from 'src/user/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private logger = new Logger('AuthService');
  async emailPasswordSignUp(
    registerDto: EmailPasswordSignUpDto,
  ): Promise<SuccessAuthDto> {
    const isEmailInUse = await this.userService.isEmailInUse(registerDto.email);
    if (isEmailInUse) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = hashPassword(registerDto.password);
    const newUserData = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.buildSuccessData(newUserData);
  }

  async emailPasswordLogIn(
    dto: EmailPasswordLogInDto,
  ): Promise<SuccessAuthDto> {
    const userLogin = await this.validateUser(dto.email, dto.password);
    if (!userLogin) {
      throw new BadRequestException('Wrong email or password');
    }
    return this.buildSuccessData(userLogin);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && comparePassword(password, user.password)) {
      return plainToClass(UserWithoutPassword, user);
    }
    return null;
  }

  async renewToken(userId: string): Promise<SuccessAuthDto> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.buildSuccessData(user);
  }

  private buildSuccessData(user: User): SuccessAuthDto {
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const signedToken = this.jwtService.sign(jwtPayload);
    return {
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      token: signedToken,
    };
  }
}
