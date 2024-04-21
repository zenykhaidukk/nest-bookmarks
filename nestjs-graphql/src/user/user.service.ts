import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  createUser(createuserData: CreateUserInput) {
    const newUser = this.usersRepository.create(createuserData);
    return this.usersRepository.save(newUser);
  }

  getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
}
