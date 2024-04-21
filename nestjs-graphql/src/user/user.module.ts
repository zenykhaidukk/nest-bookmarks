import { Module } from '@nestjs/common';
import { UserResolver } from './userResolver';
import { UsersService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { UserSettingsService } from './usersSettings.service';
import { UserSettingsResolver } from './userSettingsResolver';
import { UserSettings } from '../graphql/models/UserSettings';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [
    UsersService,
    UserResolver,
    UserSettingsService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
