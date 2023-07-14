import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/shared/modules/Database/database.module';

import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
