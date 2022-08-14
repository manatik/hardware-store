import { Module } from '@nestjs/common';
import { ErrorService } from 'common/error/error.service';

@Module({
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorModule {}
