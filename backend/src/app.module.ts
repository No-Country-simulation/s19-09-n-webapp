import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RealEstateModule } from './real-estate/real-estate.module';
import { PhotosModule } from './photos/photos.module';
import { UniversityModule } from './university/university.module';
import { ServicesModule } from './services/services.module';
import { RoomTypesModule } from './room-types/room-types.module';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    UserModule,
    AuthModule,
    PhotosModule,
    RealEstateModule,
    UniversityModule,
    ServicesModule,
    RoomTypesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
