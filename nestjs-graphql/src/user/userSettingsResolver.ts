import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { UserSettings } from '../graphql/models/UserSettings';
import { CreateUserSettingsInput } from '../graphql/utils/CreateUserSettingsInput';
import { UserSettingsService } from './usersSettings.service';

@Resolver(() => User)
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingsService) {}

  @Mutation(() => UserSettings)
  async createUserSettings(
    @Args('createUserSettings')
    data: CreateUserSettingsInput,
  ) {
    return await this.userSettingsService.createUserSettings(data);
  }
}
