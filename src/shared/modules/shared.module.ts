import { Module } from '@nestjs/common';

import { PlantsModule } from '../../modules';

import { DatabaseModule } from './Database/database.module';

@Module({
  imports: [PlantsModule, DatabaseModule],
})
export class SharedModule {}
