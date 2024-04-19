import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api');
  app.use(json({ limit: '12mb' }));
  app.use(urlencoded({ extended: true, limit: '12mb' }));
  const PORT = process.env.PORT || 9070;
  await app.listen(PORT);
  console.log(`Application V4.0 is running on: ${await app.getUrl()}/api`);
}
bootstrap();
