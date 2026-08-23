import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async findAll(@Query('institutionId') institutionId?: string) {
    return this.resourcesService.findAll(institutionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Get(':id/availability')
  async getAvailability(@Param('id') id: string, @Query('date') date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.resourcesService.getAvailability(id, targetDate);
  }
}
