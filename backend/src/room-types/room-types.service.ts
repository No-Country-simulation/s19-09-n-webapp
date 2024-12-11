import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoomTypesService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll() {
    return await this.dbService.room.findMany();
  }
}
