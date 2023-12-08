import {
  IsDecimal,
  IsDivisibleBy,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

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
  name: string;

  @IsNotEmpty({
    message: 'age 不能为空',
  })
  // @Type(() => Number)
  // @IsInt({
  //   message: 'age 必须是数字',
  // })
  @Matches(/^[1-9]([0-9]{0,1})$/, {
    message: '年龄格式不正确',
  })
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class GetOneUserDto extends CreateUserDto {
  @Exclude()
  age: number;

  @Expose()
  get test(): string {
    return this.age + this.name;
  }
  @Transform(({ value }) => {
    return value + 10;
  })
  @Expose({ name: 'uid' })
  id: number;
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
