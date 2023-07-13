import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { envSchema } from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const env = envSchema.parse(process.env);

    app.enableCors();
    app.enableShutdownHooks();
    app.setGlobalPrefix('server');

    await app.listen(env.PORT);
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }
}
bootstrap();
