import { BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodTypeDef } from 'zod';

export function requestDataValidation<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(reqData: unknown, zodSchema: ZodSchema<TOutput, TDef, TInput>) {
  const parsedRequestData = zodSchema.safeParse(reqData);

  if (!parsedRequestData.success) {
    throw new BadRequestException('Failed parsing request data');
  }

  return parsedRequestData.data;
}
