import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-service/prisma.module';
import { ErrorModule } from '@error/error.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { FilesModule } from '@files/files.module';

@Module({
  imports: [PrismaModule, ErrorModule, FilesModule],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [],
})
export class PhotosModule {}
