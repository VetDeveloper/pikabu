import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './inputs/create-user.input';
import { UserEntity } from './user.entity';
import { UpdateUserInput } from './inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserByEmail(email: string): Promise<UserModel> {
    return this.userRepository.getUserByEmail(email);
  }

  getAllUsers(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  async updateOneUser(userId: number, dto: UpdateUserInput) {
    const user: UserModel = await this.userRepository.findOneOrFail(userId);

    const newUser = this.userRepository.create({
      ...user,
      ...dto,
    });
    dto.password
      ? (newUser.password = await bcrypt.hash(dto.password, 5))
      : newUser.password;
    return await this.userRepository.save(newUser);
  }

  async registrateOne(dto: CreateUserInput): Promise<UserModel> {
    const alreadyExist: UserEntity = await this.getUserByEmail(dto.email);
    if (alreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    return this.userRepository.save({ ...dto, password: hashPassword });
  }

  findOne(id: number) {
    return this.userRepository.findUserOrFail(id);
  }
}
