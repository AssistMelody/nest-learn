import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto).then(() => {
      return {
        success: true,
        message: '任务创建成功',
      };
    });
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('/test')
  findImage(@Query('id') id: string, @Res() res: Response) {
    const stream = createReadStream(resolve(__dirname, `../../baidu.png`));
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename=baidu.png');
    stream.pipe(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.imageService.updateStatus(id, 1).then(() => {
      return {
        success: true,
        message: '任务状态更新成功',
      };
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
