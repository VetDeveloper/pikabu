import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/entities/users.entity';
import { CreateUserInput } from 'src/users/inputs/create-user.input';
import { AuthResponse } from 'src/auth/models/auth-response.model';
import { UserService } from 'src/users/services/users.service';
import { TokenPayload } from '../types/token-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserInput): Promise<AuthResponse> {
    const user: UsersEntity = await this.userService.validateUser(
      dto.email,
      dto.password,
    );
    return this.getTokenObject(user);
  }

  async registrateOne(dto: CreateUserInput): Promise<AuthResponse> {
    const alreadyExist: UsersEntity = await this.userService.getUserByEmail(
      dto.email,
    );
    if (alreadyExist) {
      throw new BadRequestException(
        'User with this email is already registered',
      );
    }
    const newUser: UsersEntity = await this.userService.registrateOneUser(dto);
    return this.getTokenObject(newUser);
  }

  private getTokenObject(user: UsersEntity): AuthResponse {
    const payload: TokenPayload = { email: user.email, id: user.id };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
