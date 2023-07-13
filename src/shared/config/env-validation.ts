import 'dotenv/config';
import { z } from 'zod';
import * as process from 'process';
import { Logger } from '@nestjs/common';

const userName = 'u766359255_rod';

export const envSchema = z.object({
  HOST: z.string().trim().default('0.0.0.0'),
  PORT: z
    .string()
    .default('5000')
    .transform((value) => Number(value)),
  DB_HOST: z.string(),
  DB_PORT: z.string().default('3306'),
  DB_USER: z.string().default(userName),
  DB_PWD: z.string(),
  DB_NAME: z.string().default(userName),
});

export function validate(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success && 'error' in result) {
    for (const { message, path } of result.error.issues) {
      Logger.error(message, path.join('.'));
    }
    process.exit(1);
  }

  return result.data;
}

export type EnvType = z.infer<typeof envSchema>;
