import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './image.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    BullModule.registerQueue({
      name: 'snapshot',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageProcessor],
})
export class ImageModule {}
