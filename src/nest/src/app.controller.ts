import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

// 直接跟request交互
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //todo 封装成`File`模块
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './upload' }))
  @ApiOperation({ summary: '上传' })
  uploadFile(@UploadedFile() file) {
    // this will auto-save the file in the `./upload` dir.
    // file shape
    // {
    //   fieldname: 'file',
    //   originalname: 'test.md',
    //   encoding: '7bit',
    //   mimetype: 'text/markdown',
    //   destination: './upload',
    //   filename: '96d2260c51de6822c73d8317c2421f1a',
    //   path: 'upload/96d2260c51de6822c73d8317c2421f1a',
    //   size: 181
    // }
    return {
      success: true,
      filepath: file.path,
    };
  }
}
