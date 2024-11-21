import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private logger: Logger = new Logger('DatabaseService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Db Connected');
  }
}
