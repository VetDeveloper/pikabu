import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/services/users.service';
import { TokenPayload } from '../types/token-payload.type';
import { UsersEntity } from 'src/users/entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private confService: ConfigService,
    private usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<TokenPayload> {
    const user: UsersEntity = await this.usersService.findOne(payload.id);
    if (!user || payload.email !== user.email) {
      throw new UnauthorizedException('Bad jwt token');
    }
    return user;
  }
}
