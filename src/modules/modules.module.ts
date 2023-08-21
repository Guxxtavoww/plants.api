import { Module } from '@nestjs/common';

import { UsersModule } from '../shared/modules';
import { DatabaseModule } from '../shared/modules/database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
})
export class ModulesModule {}
