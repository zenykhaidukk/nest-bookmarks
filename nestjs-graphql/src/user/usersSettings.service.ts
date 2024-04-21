import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettings } from '../graphql/models/UserSettings';
import { CreateUserSettingsInput } from '../graphql/utils/CreateUserSettingsInput';
import { User } from '../graphql/models/User';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private usersSettingRepository: Repository<UserSettings>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUserSettings(createUserSettingData: CreateUserSettingsInput) {
    const findUser = await this.usersRepository.findOneBy({
      id: createUserSettingData.userId,
    });
    if (!findUser) throw new Error('User not found');
    const newUserSettings = this.usersSettingRepository.create(
      createUserSettingData,
    );
    const savedSettings = await this.usersSettingRepository.save(
      newUserSettings,
    );
    findUser.settings = savedSettings;
    await this.usersRepository.save(findUser);
    return savedSettings;
  }

  getUserSettingsById(userId: number) {
    return this.usersSettingRepository.findOneBy({ userId });
  }
}
