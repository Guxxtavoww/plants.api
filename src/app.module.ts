import { Module } from '@nestjs/common';

import { SharedModule } from './shared/modules';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
