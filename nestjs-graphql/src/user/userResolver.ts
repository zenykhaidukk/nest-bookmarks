import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { UserSettings } from '../graphql/models/UserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { UsersService } from './user.service';
import { UserSettingsService } from './usersSettings.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UsersService,
    private userSettingsService: UserSettingsService,
  ) {}

  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') dto: CreateUserInput) {
    return this.userService.createUser(dto);
  }

  @ResolveField(() => UserSettings, { name: 'settings', nullable: true })
  Setting(@Parent() parent: User) {
    return this.userSettingsService.getUserSettingsById(parent.id);
  }
}
