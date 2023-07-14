import { z } from 'zod';

export const plantResponseSchema = z.object({
  plant_id: z.number().optional(),
  regular_name: z.string(),
  scientific_name: z.string().optional(),
  sun_exposure: z.union([
    z.literal('high'),
    z.literal('medium'),
    z.literal('low'),
    z.literal('none'),
  ]),
  period: z.number(),
  water_level: z.number(),
  last_hydration: z.union([z.date(), z.string()]).nullable(),
  next_hydration: z.union([z.date(), z.string()]).nullable(),
});

export const plantResponseArraySchema = z.array(plantResponseSchema);

export type PlantResponseType = z.infer<typeof plantResponseSchema>;

export const plantSchema = z.object({
  plant_id: z.number().optional(),
  regular_name: z.string(),
  scientific_name: z.string().optional(),
  sun_exposure: z.union([
    z.literal('high'),
    z.literal('medium'),
    z.literal('low'),
    z.literal('none'),
  ]),
  period: z.number(),
  water_level: z.number(),
});

export const plantIdValidation = z
  .string()
  .nonempty()
  .trim()
  .transform((id) => {
    const transformedValue = Number(id);

    return Number.isNaN(transformedValue) ? null : transformedValue;
  });

export const plantArraySchema = z.array(plantSchema);

export type PlantType = z.infer<typeof plantSchema>;
