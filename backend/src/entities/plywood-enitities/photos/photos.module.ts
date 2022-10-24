import { Module } from '@nestjs/common';
import { PrismaModule } from 'database/prisma/prisma.module';
import { ErrorModule } from 'common/error/error.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { FilesModule } from '../../../common/files/files.module';

@Module({
  imports: [PrismaModule, ErrorModule, FilesModule],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [],
})
export class PhotosModule {}
