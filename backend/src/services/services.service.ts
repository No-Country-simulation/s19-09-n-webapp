import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ServicesService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    return await this.dbService.service.findMany();
  }
}
