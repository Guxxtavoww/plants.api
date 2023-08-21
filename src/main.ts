import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ENV_VARIABLES } from './shared/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    app.enableCors();
    app.enableShutdownHooks();
    app.setGlobalPrefix('server');

    await app.listen(ENV_VARIABLES.PORT);
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }
}
bootstrap();
