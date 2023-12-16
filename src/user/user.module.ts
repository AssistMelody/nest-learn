import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './user.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  providers: [UserService, AudioProcessor],
  controllers: [UserController],
})
export class UserModule {}
