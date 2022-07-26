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
      port: 25432,
      username: 'test',
      password: 'test',
      database: 'test',
      synchronize: false,
    }),
    UserModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
