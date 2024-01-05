import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  createAResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.createAResource(createResourceDto);
  }

  @Get()
  getAllResources() {
    return this.resourcesService.getAllResources();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(+id, updateResourceDto);
  }

  @Delete(':id')
  deleteAResource(@Param('id') id: string) {
    return this.resourcesService.deleteAResource(+id);
  }
}
