import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }), new ValidationPipe({ transform: true, transformOptions: { groups: ['transform'] } }))
  await app.listen(3000, '0.0.0.0');
  // app.use(cors()
  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   credentials: true
  // });

}
bootstrap();
