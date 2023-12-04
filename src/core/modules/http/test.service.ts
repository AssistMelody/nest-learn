import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ServiceNameService {
  constructor(@Inject('HTTP_OPTIONS') public test: any) {
    console.log('----------', this.test);
  }
}
