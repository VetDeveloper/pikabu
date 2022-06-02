import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from '../inputs/create-user.input';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserInput } from '../inputs/update-user.input';
import { PaginateArgs } from 'src/common/args/paginate.args';
import { PaginatedUsers } from '../models/paginated-users.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.getUserByEmail(email);
  }

  getAllUsers(paginateArgs: PaginateArgs): Promise<PaginatedUsers> {
    return this.userRepository.getUsers(paginateArgs);
  }

  async deleteUser(id : number) : Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    const passwordEquals = await bcrypt.compare(pass, user.password);

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Incorrect login or password');
  }

  async updateOneUser(
    userId: number,
    dto: UpdateUserInput,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneOrFail(userId);

    if (dto.email) {
      const alreadyExist = await this.getUserByEmail(dto.email);
      if (alreadyExist) {
        throw new BadRequestException(
          'User with this email already exists',
        );
      }
    }

    const newUser = this.userRepository.create({
      ...user,
      ...dto,
    });
    dto.password
      ? (newUser.password = await bcrypt.hash(dto.password, 5))
      : newUser.password;
    return await this.userRepository.save(newUser);
  }

  registrateOneUser(user: CreateUserInput): Promise<UserEntity> {
    const userEntity: UserEntity = this.userRepository.create(user)
    return this.userRepository.save(userEntity);
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findUserOrFail(id);
  }
}
