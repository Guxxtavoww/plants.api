import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { ENV_VARS } from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    app.enableCors();
    app.enableShutdownHooks();
    app.setGlobalPrefix('server');

    await app.listen(ENV_VARS.PORT);
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }
}
bootstrap();
