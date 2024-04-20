import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
  exports: [MyLoggerService],
  providers: [MyLoggerService],
})
export class MyLoggerModule {}
