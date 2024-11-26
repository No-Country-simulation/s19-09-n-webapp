import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { DatabaseService } from 'src/database/database.service';
import { SystemRoles } from 'src/user/entities';
import { JwtGuardBearer } from 'src/auth/guards';
import * as bcrypt from 'bcrypt';

const authPrefix = '/auth';

enum authRoutes {
  LOGIN = authPrefix + '/login',
  REGISTER = authPrefix + '/register',
  RENEW = authPrefix + '/renew',
}
const registerData = {
  name: 'Jorge',
  last_name: 'Trujillo',
  password: '123456',
  email: 'email@example.com',
};
const returnedUser = {
  name: 'Jorge',
  id: '12345',
  last_name: 'Trujillo',
  email: 'email@example.com',
  email_verified: true,
  password: 'hashed_password',
  is_owner: false,
  deleted: false,
  role: SystemRoles.USER,
  remember_token: null,
  created_at: new Date('2023-11-01T10:00:00Z'),
  updated_at: new Date('2024-11-21T10:00:00Z'),
};

const succesResponseAuth = {
  name: 'Jorge',
  last_name: 'Trujillo',
  email: 'email@example.com',
  token: expect.any(String),
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  let prismaMock: DeepMockProxy<DatabaseService>;

  beforeEach(async () => {
    prismaMock = mockDeep<DatabaseService>();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(prismaMock)
      .overrideGuard(JwtGuardBearer)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(authRoutes.REGISTER, () => {
    it(' (POST) should fail if send data incomplete', async () => {
      prismaMock.user.create.mockResolvedValueOnce(returnedUser);
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('');
      await request(app.getHttpServer())
        .post(authRoutes.REGISTER)
        .send({ name: 'Jorge' })
        .expect(400);
    });

    it(' (POST) should return success if all data correct', async () => {
      prismaMock.user.create.mockResolvedValueOnce(returnedUser);
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('');
      await request(app.getHttpServer())
        .post(authRoutes.REGISTER)
        .send(registerData)
        .expect(201);
    });

    it('(POST) should return used email if email already registered', async () => {
      prismaMock.user.findUnique.mockResolvedValue(returnedUser);
      const response = await request(app.getHttpServer())
        .post(authRoutes.REGISTER)
        .send(registerData)
        .expect(400);

      expect(response.body.message).toBe('Email already in use');
    });
  });

  describe('/auth/login', () => {
    it('(POST) should return data if login access success', async () => {
      prismaMock.user.findUnique.mockResolvedValue(returnedUser);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      const response = await request(app.getHttpServer())
        .post(authRoutes.LOGIN)
        .send({
          email: 'email@example.com',
          password: '123456',
        })
        .expect(200);

      expect(response.body).toEqual(succesResponseAuth);
    });

    it('(POST) should return "Wrong email or password" if email doesnt matches', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const response = await request(app.getHttpServer())
        .post(authRoutes.LOGIN)
        .send({
          email: 'email@ex.ex',
          password: '123456',
        })
        .expect(400);

      expect(response.body.message).toEqual('Wrong email or password');
    });

    it('(POST) should return "Wrong email or password" if password doesnt matches', async () => {
      prismaMock.user.findUnique.mockResolvedValue(returnedUser);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
      const response = await request(app.getHttpServer())
        .post(authRoutes.LOGIN)
        .send({
          email: 'email@example.ex',
          password: '1234567',
        })
        .expect(400);

      expect(response.body.message).toEqual('Wrong email or password');
    });
  });

  describe('/auth/renew', () => {
    it('(GET) should return "Unauthorized" if no token present', async () => {
      await request(app.getHttpServer())
        .get(authRoutes.RENEW)
        .set('Authorization', 'Bearer test-token')
        .expect(401);
    });
  });
});
