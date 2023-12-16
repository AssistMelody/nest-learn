import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty({
    message: 'email id 必填',
  })
  @IsNumber(
    {},
    {
      message: 'email id 不正确',
    },
  )
  emailId: number;
}
