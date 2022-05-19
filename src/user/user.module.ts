import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [UserService],
})
export class UserModule {}
