import {
  Controller,
  Delete,
  Post,
  Get,
  Query,
  Body,
  ForbiddenException,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
// import { Request as Req, Response as Res } from 'express';
import { UserService } from './user.service';
// import { User } from './user.entity';
import { Exception } from 'src/utils/exception';
import { LoggerService } from 'src/core/modules/logger/services/logger.service';
import {
  CreateUserDto,
  GetOneUserDto,
  UpdateUserDto,
  UserEntity,
} from './dtos/user.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IsProtect } from 'src/core/decorators';
// import { plainToClass } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(
    public userService: UserService,
    private logger: LoggerService,
    @InjectQueue('audio') private readonly audioQueue: Queue,
  ) {}

  @Get('find')
  findAll(): any {
    return this.userService.getList();
  }

  @Post('create')
  create(@Body() body: CreateUserDto): any {
    return this.userService.create(body as UserEntity).then(() => {
      return {
        code: 200,
        message: '创建成功',
      };
    });
  }

  @Get('findOne')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Query('id') id): any {
    console.debug('user', typeof id);
    if (id == 1) {
      throw new ForbiddenException();
    }
    if (id == 2) {
      throw new Exception(200001, 'asdasd');
    }
    return this.userService.findById(id).then((res) => {
      console.log(new GetOneUserDto(res));
      return new GetOneUserDto(res);
    });
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto): object {
    return this.userService.update(id, body).then(() => {
      return {
        code: 200,
        message: '更新成功',
      };
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userService
      .delete(id)
      .then(() => {
        return {
          code: 200,
          message: '删除成功',
        };
      })
      .catch((err) => {
        this.logger.error('user', err);
        return {
          code: 500,
          message: '删除失败',
        };
      });
  }

  @Post('transcode')
  async transcode() {
    return await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
    });
  }

  // @IsProtect()
  // @Get('saveImage')
  // async saveImage(@Query('link') link: string): Promise<any> {
  //   try {
  //     const client = await this.browser.pool.acquire();
  //     const page = await client.newPage();
  //     await page.goto(link);
  //     return {
  //       code: 200,
  //       message: '保存成功',
  //     };
  //   } catch (error) {
  //     throw new Exception(100, error.message);
  //   }
  // }
}
