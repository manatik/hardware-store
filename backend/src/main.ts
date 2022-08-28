import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from 'app.module';

const PORT = Number.isNaN(Number(process.env.PORT)) ? 9000 : Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true });

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useStaticAssets(path.join(__dirname, '../..', 'assets'), {
    index: false,
    prefix: '/public',
  });

  await app.listen(PORT, '0.0.0.0');
}

bootstrap().then(() => {
  console.log(`Server started by ${PORT} port`);
});
