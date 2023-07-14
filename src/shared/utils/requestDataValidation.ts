import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

export function requestDataValidation<T = number>(
  reqData: unknown,
  zodSchema: z.Schema<T>,
) {
  const parsedRequestData = zodSchema.safeParse(reqData);

  if (!parsedRequestData.success) {
    throw new BadRequestException('Failed parsing request data');
  }

  return parsedRequestData.data;
}
