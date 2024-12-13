import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('AuthController', () => {
  let authController: AuthController;
  let authServiceMock: DeepMockProxy<AuthService>;

  const createUserData = {
    name: 'Jhon',
    last_name: 'Doe',
    email: 'jhon_doe@example.com',
    password: 'hashed_password_example',
  };

  const authResponse = {
    email: createUserData.email,
    name: createUserData.name,
    last_name: createUserData.last_name,
    token: 'x',
  };

  beforeEach(async () => {
    authServiceMock = mockDeep<AuthService>();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should return user data and token at register', async () => {
    authServiceMock.emailPasswordSignUp.mockResolvedValueOnce(authResponse);
    const user = await authController.emailPasswrdRregister(createUserData);
    expect(user).toEqual(authResponse);
  });

  it('should return info at login', async () => {
    authServiceMock.emailPasswordLogIn.mockResolvedValueOnce(authResponse);
    const user = await authController.emailPasswordLogin({
      email: '',
      password: '',
    });
    expect(user).toEqual(authResponse);
  });
});
