import { IsNotEmpty, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export interface User {
  id?: number;
  name: string;
  age: number;
}

export interface UserEntity extends User {
  createdAt: Date;
  updatedAt: Date;
}

export class CreateUserDto implements User {
  @IsNotEmpty({
    message: 'name 不能为空',
  })
  @Matches(/^[a-zA-Z0-9_-]{3,16}$/, {
    message: 'name 格式不正确',
  })
  name: string;

  @IsNotEmpty({
    message: 'age 不能为空',
  })
  // @IsNumber(
  //   {},
  //   {
  //     message: 'age 必须是数字',
  //   },
  // )
  @Matches(/^[1-9][0-9]{1,2}$/, {
    message: '年龄格式不正确',
  })
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNotEmpty({
  //   message: 'id 不能为空',
  // })
  // @IsNumber(
  //   {},
  //   {
  //     message: 'id 必须是数字',
  //   },
  // )
  // id: number;
}
