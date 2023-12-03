import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Query,
  Body,
  ForbiddenException,
} from '@nestjs/common';
// import { Request as Req, Response as Res } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Exception } from 'src/utils/exception';
import { LoggerService } from 'src/core/modules/logger/services/logger.service';

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
  create(@Body() body: User): any {
    return this.userService.create(body);
  }

  @Get('findOne')
  findOne(@Query('id') id): any {
    console.debug('user', id);
    console.log('user', 'xxx');

    if (id == 1) {
      throw new ForbiddenException();
    }
    if (id == 2) {
      throw new Exception(200001, 'asdasd');
    }
    return this.userService.findById(id);
  }

  @Put('update')
  update(): string {
    return 'update';
  }

  @Delete('delete')
  delete(): string {
    return 'delete';
  }
}
