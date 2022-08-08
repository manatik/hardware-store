import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'entities/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { AuthorizationModule } from 'authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      synchronize: false
    }),
    UserModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
