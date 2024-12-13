import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { DatabaseService } from 'src/database/database.service';
import { SystemRoles } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let prismaMock: DeepMockProxy<DatabaseService>;

  beforeEach(async () => {
    prismaMock = mockDeep<DatabaseService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DatabaseService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  const createUserData = {
    name: 'Jhon',
    last_name: 'Doe',
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

  it('should return the user at create (without password)', async () => {
    prismaMock.user.create.mockResolvedValueOnce(returnedUser);
    const prismaResponse = await service.create(createUserData);
    expect(prismaResponse).toEqual({
      ...returnedUser,
      password: undefined,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should return true if email already in use', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(returnedUser);
    const isUnique = await service.isEmailInUse(returnedUser.email);
    expect(isUnique).toBe(true);
  });

  it('should return false if email is not used', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    const isUnique = await service.isEmailInUse(returnedUser.email);
    expect(isUnique).toBe(false);
  });

  it('should return the user if email exists', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(returnedUser);
    const user = await service.findOneByEmail(returnedUser.email);
    expect(user).toEqual(returnedUser);
  });

  it('should return null if email does not exists', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    const user = await service.findOneByEmail('email@example.com');
    expect(user).toBeNull();
  });

  it('should return user data if id exists', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(returnedUser);
    const user = await service.findOneById('12345');
    expect(user).toEqual(returnedUser);
  });

  it('should return null if id does not exists', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    const user = await service.findOneById('123');
    expect(user).toBeNull();
  });
});
