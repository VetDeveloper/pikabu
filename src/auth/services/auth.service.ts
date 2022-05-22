import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateUserInput } from "src/user/inputs/create-user.input";
import { AuthResponse } from "src/auth/models/auth-response.model";
import { UserService } from "src/user/services/user.service";
import { TokenPayload } from "../types/token-payload.type";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserInput): Promise<AuthResponse> {
    const user: UserEntity = await this.userService.validateUser(
      dto.email,
      dto.password,
    );
    return this.getTokenObject(user);
  }

  async registrateOne(dto: CreateUserInput): Promise<AuthResponse> {
    const alreadyExist: UserEntity = await this.userService.getUserByEmail(
      dto.email,
    );
    if (alreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    const newUser: UserEntity = await this.userService.registrateOneUser({
      ...dto,
      password: hashPassword,
    });
    return this.getTokenObject(newUser);
  }

  private getTokenObject(user: UserEntity): AuthResponse {
    const payload: TokenPayload = { email: user.email, id: user.id };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}