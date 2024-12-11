import { Module } from '@nestjs/common';
import { RoomTypesService } from './room-types.service';
import { RoomTypesController } from './room-types.controller';

@Module({ providers: [RoomTypesService], controllers: [RoomTypesController] })
export class RoomTypesModule {}
