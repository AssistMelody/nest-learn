import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user.entity';

@Module({
  imports: [],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
