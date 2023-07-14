import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { PlantsService } from './plants.service';
import { plantSchema } from './plants.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  async listAllPlants() {
    return await this.plantsService.listAllPlants();
  }

  @Post()
  async createPlant(@Body() plantData: unknown) {
    const parsedData = plantSchema.safeParse(plantData);

    if (!parsedData.success) {
      throw new BadRequestException('Failed parsing request body');
    }

    return await this.plantsService.createPlant(parsedData.data);
  }
}
