import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import {NestExpressApplication, ExpressAdapter} from "@nestjs/platform-express"
import { AppModule } from 'app.module';

const PORT = Number.isNaN(Number(process.env.PORT)) ? 9000 : Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  app.use(cookieParser());

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, }));

  await app.listen(PORT, '0.0.0.0');
}

bootstrap().then(() => {
  console.log(`Server started by ${PORT} port`);
});
