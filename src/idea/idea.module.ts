import { Module } from '@nestjs/common';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
