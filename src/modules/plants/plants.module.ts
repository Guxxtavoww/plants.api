import { Module } from '@nestjs/common';

import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
// import { DatabaseService } from 'src/shared/modules/Database/database.service';
import { DatabaseModule } from 'src/shared/modules/Database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
