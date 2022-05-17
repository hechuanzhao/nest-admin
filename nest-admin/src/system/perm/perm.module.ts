import { Module } from '@nestjs/common';
import { PermService } from './perm.service';
import { PermController } from './perm.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PermController],
  providers: [PermService],
  exports: [PermService],
})
export class PermModule {}
