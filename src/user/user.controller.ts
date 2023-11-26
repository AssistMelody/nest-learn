import {
  Controller,
  Delete,
  Post,
  Get,
  Put,
  Request,
  Response,
  Headers,
} from '@nestjs/common';
import { Request as Req, Response as Res } from 'express';
// import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor() {}

  @Get('find')
  findAll(): any {
    // const resut = this.userService.getList();
    return 'resut';
  }

  @Post('create')
  create(
    @Request() req: Req,
    @Response() res: Res,
    @Headers('aaa') headers,
  ): any {
    return res.status(201).json({
      id: req.ip,
      header: headers,
      methods: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
    });
  }

  @Get('findOne')
  findOne(): any {
    return 'xxxx';
    // return this.userService.getList();
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
