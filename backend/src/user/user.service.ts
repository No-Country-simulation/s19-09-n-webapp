import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { User, UserWithoutPassword } from './entities';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const newUser = await this.dbService.user.create({
      data: { ...createUserDto },
    });
    return plainToClass(UserWithoutPassword, newUser);
  }

  async isEmailInUse(email: string): Promise<boolean> {
    const existing = await this.dbService.user.findUnique({
      where: { email },
      select: { email: true },
    });
    return !!existing;
  }

  async findOneByEmail(
    email: string,
    isDeleted: boolean = false,
  ): Promise<User | null> {
    const user = await this.dbService.user.findUnique({
      where: { email, deleted: isDeleted },
    });
    return user ? plainToClass(User, user) : null;
  }

  async findOneById(
    userId: string,
    isDeleted: boolean = false,
  ): Promise<User | null> {
    const user = await this.dbService.user.findUnique({
      where: { id: userId, deleted: isDeleted },
    });
    return user ? plainToClass(User, user) : null;
  }
}
