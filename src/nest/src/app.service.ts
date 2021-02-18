import { Injectable } from '@nestjs/common';

// 封装服务，提供给controller使用
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
