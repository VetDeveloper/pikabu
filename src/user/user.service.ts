import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './inputs/create-user.input';
import { UserEntity } from './user.entity';
import { UpdateUserInput } from './inputs/update-user.input';
import { TokenPayload } from 'src/auth/types/token-payload.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from './models/auth-response.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService,private configService: ConfigService,) {}

  getUserByEmail(email: string): Promise<UserModel> {
    return this.userRepository.getUserByEmail(email);
  }

  getAllUsers(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  async validateUser(email: string, pass: string): Promise<UserModel> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }

    const passwordEquals = await bcrypt.compare(pass, user.password);

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Неправильный логин или пароль');
  }

  private getTokenObject (
    user: UserModel
  ): AuthResponse {
    const payload: TokenPayload = { email: user.email, id: user.id };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload)
      }
    }

    async login(dto: CreateUserInput): Promise<AuthResponse>  {
      const user: UserModel = await this.validateUser(dto.email, dto.password);
      return this.getTokenObject(user);
    }

  async updateOneUser(userId: number, dto: UpdateUserInput) : Promise<UserModel>  {
    const user: UserModel = await this.userRepository.findOneOrFail(userId);
    
    if(dto.email) {
      const alreadyExist = await this.getUserByEmail(dto.email);
      if (alreadyExist) {
        throw new BadRequestException('Пользователь с таким email уже существует');
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

  async registrateOne(dto: CreateUserInput) : Promise<AuthResponse> {
    const alreadyExist: UserEntity = await this.getUserByEmail(dto.email);
    if (alreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    const newUser: UserModel = await this.userRepository.save({ ...dto, password: hashPassword });
    return this.getTokenObject(newUser);
  }

  findOne(id: number) : Promise<UserModel> {
    return this.userRepository.findUserOrFail(id);
  }
}
