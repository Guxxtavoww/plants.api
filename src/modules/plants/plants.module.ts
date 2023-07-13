import { Module } from '@nestjs/common';

import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

@Module({
  imports: [],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
