import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // 后端接口统一放在api.anco.fun下，取消api前缀
  // app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Nest Learner Demo')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(5000);
}
bootstrap();
