import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { SystemRoles } from 'src/user/entities/user.entity';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import * as bcrypt from 'bcrypt';
import { SuccessAuthDto } from './dto/success-auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userServiceMock: DeepMockProxy<UserService>;

  beforeEach(async () => {
    userServiceMock = mockDeep<UserService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
      ],
      imports: [
        JwtModule.register({
          global: true,
          secret: envs.jwt.secret,
          signOptions: {
            expiresIn: envs.jwt.duration,
          },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const createUserData = {
    name: 'Jhon',
    last_name: 'Doe',
    email: 'jhon_doe@example.com',
    password: 'hashed_password_example',
  };

  const loginData = {
    email: 'jhon_doe@example.com',
    password: 'hashed_password_example',
  };

  const returnedUser = {
    name: 'Jhon',
    id: '12345',
    last_name: 'Doe',
    email: 'jhon_doe@example.com',
    email_verified: true,
    password: 'hashed_password',
    is_owner: false,
    deleted: false,
    role: SystemRoles.USER,
    remember_token: null,
    created_at: new Date('2023-11-01T10:00:00Z'),
    updated_at: new Date('2024-11-21T10:00:00Z'),
  };

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should return the email if register success', async () => {
    userServiceMock.create.mockResolvedValueOnce(returnedUser);
    const data = await service.emailPasswordSignUp(createUserData);
    expect(data).toEqual({
      email: returnedUser.email,
      name: returnedUser.name,
      last_name: returnedUser.last_name,
      token: expect.any(String),
    });
  });

  it('should return an error "Email already in use" if email already in use', async () => {
    userServiceMock.isEmailInUse.mockResolvedValueOnce(true);
    await expect(service.emailPasswordSignUp(createUserData)).rejects.toThrow(
      new BadRequestException('Email already in use'),
    );
  });

  it('should return user data if exists', async () => {
    userServiceMock.findOneByEmail.mockResolvedValueOnce(returnedUser);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    const data = await service.validateUser(
      createUserData.email,
      createUserData.password,
    );
    const { password, ...rest } = returnedUser;
    expect(data).toEqual(rest);
  });

  it('should return null if email is not registered at validate', async () => {
    userServiceMock.findOneByEmail.mockResolvedValueOnce(null);
    const data = await service.validateUser(
      'email@example.com',
      createUserData.password,
    );
    expect(data).toBeNull();
  });

  it('should return null if passwords doesnt match at validate', async () => {
    userServiceMock.findOneByEmail.mockResolvedValueOnce(returnedUser);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
    const data = await service.validateUser(
      createUserData.email,
      createUserData.password,
    );
    expect(data).toBeNull();
  });

  it('should return a BadRequestException if email or password fails at login', async () => {
    userServiceMock.findOneByEmail.mockResolvedValueOnce(null);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
    await expect(service.emailPasswordLogIn(loginData)).rejects.toThrow(
      new BadRequestException('Wrong email or password'),
    );
  });

  it('should return the data at success auth', async () => {
    userServiceMock.findOneByEmail.mockResolvedValueOnce(returnedUser);
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    const resp = await service.emailPasswordLogIn(loginData);
    const expectedResp: SuccessAuthDto = {
      email: loginData.email,
      last_name: returnedUser.last_name,
      name: returnedUser.name,
      token: expect.any(String),
    };
    expect(resp).toEqual(expectedResp);
  });

  it('should throw an Unauthorized exception if user not found at renew', async () => {
    userServiceMock.findOneById.mockResolvedValue(null);
    await expect(service.renewToken('12')).rejects.toThrow(
      new UnauthorizedException(),
    );
  });

  it('should return login success data at renew token', async () => {
    userServiceMock.findOneById.mockResolvedValueOnce(returnedUser);
    const resp = await service.renewToken('12345');
    const expectedResp: SuccessAuthDto = {
      email: returnedUser.email,
      last_name: returnedUser.last_name,
      name: returnedUser.name,
      token: expect.any(String),
    };
    expect(resp).toEqual(expectedResp);
  });
});
