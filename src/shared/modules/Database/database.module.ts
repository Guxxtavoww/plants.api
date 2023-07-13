import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';

import { config } from '../../../../knexfile';

@Module({
  imports: [
    KnexModule.forRoot({
      config,
    }),
  ],
})
export class DatabaseModule {}
