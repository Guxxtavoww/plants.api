import { Module } from '@nestjs/common';

import { PlantsModule } from '../../modules';

@Module({
  imports: [PlantsModule],
})
export class SharedModule {}
