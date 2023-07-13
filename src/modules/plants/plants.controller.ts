import { Controller, Get } from '@nestjs/common';

import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Get()
  async listAllPlants() {
    return await this.plantsService.listAllPlants();
  }

  @Get('test')
  test() {
    return { planta: 'oi' };
  }
}
