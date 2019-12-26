import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {}

  @Get(':id')
  readIdea() {}

  @Post()
  createIdea() {}

  @Put(':id')
  updateIdea() {}

  @Delete(':id')
  deleteIdea() {}
}
