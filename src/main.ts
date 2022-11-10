import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync(
    '/etc/letsencrypt/live/upickapi.shop/fullchain.pem',
    'utf8',
  ),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/upickapi.shop/privkey.pem',
    'utf8',
  ),
  ca: fs.readFileSync('/etc/letsencrypt/live/upickapi.shop/chain.pem', 'utf8')
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({ credentials: true, origin: '*' });

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(443);
}
bootstrap();
