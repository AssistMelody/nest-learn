import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Query,
  Body,
} from '@nestjs/common';
// import { Request as Req, Response as Res } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

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
