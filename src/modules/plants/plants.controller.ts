import { z } from 'zod';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { requestDataValidation } from 'src/shared/utils';

import { PlantsService } from './plants.service';
import { plantSchema, plantArraySchema, plantIdValidation } from './plants.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  async listAllPlants() {
    return await this.plantsService.listAllPlants();
  }

  @Get('/:plant_id')
  async getPlant(@Param('plant_id') plant_id: string) {
    const parsedPlantId = requestDataValidation(plant_id, plantIdValidation);

    return await this.plantsService.getPlant(parsedPlantId);
  }

  @Post()
  async createPlant(@Body() plantData: unknown) {
    const parsedData = requestDataValidation(plantData, plantSchema);

    return await this.plantsService.createPlant(parsedData);
  }

  @Post('create-many')
  async createManyPlants(@Body() plantData: unknown) {
    const parsedData = requestDataValidation(plantData, plantArraySchema);

    return await this.plantsService.createManyPlants(parsedData);
  }

  @Put()
  async updatePlant(@Body() plantData: unknown) {
    const parsedData = requestDataValidation(plantData, plantSchema);

    return await this.plantsService.editPlant(parsedData);
  }

  @Delete('/:plant_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlant(@Param('plant_id') plant_id: string) {
    const parsedPlantId: number = requestDataValidation(
      plant_id,
      plantIdValidation as z.Schema,
    );

    return await this.plantsService.deletePlant(parsedPlantId);
  }
}
