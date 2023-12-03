import {
  Controller,
  Delete,
  Post,
  Get,
  Query,
  Body,
  ForbiddenException,
  ParseIntPipe,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { Request as Req, Response as Res } from 'express';
import { UserService } from './user.service';
// import { User } from './user.entity';
import { Exception } from 'src/utils/exception';
import { LoggerService } from 'src/core/modules/logger/services/logger.service';
import { CreateUserDto, UpdateUserDto, UserEntity } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(
    public userService: UserService,
    private logger: LoggerService,
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
  findOne(
    @Query(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => new Exception(200002, '请求参数错误'),
      }),
    )
    id,
  ): any {
    console.debug('user', typeof id);
    if (id == 1) {
      throw new ForbiddenException();
    }
    if (id == 2) {
      throw new Exception(200001, 'asdasd');
    }
    return this.userService.findById(id);
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() body: UpdateUserDto): object {
    console.debug(typeof body.age);
    return this.userService.update(id, body).then(() => {
      return {
        code: 200,
        message: '更新成功',
      };
    });
  }

  @Delete('delete')
  delete(): string {
    return 'delete';
  }
}
