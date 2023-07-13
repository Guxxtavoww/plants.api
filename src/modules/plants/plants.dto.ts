import { z } from 'zod';

export const plantSchema = z.object({
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

export const plantArraySchema = z.array(plantSchema);

export type PlantType = z.infer<typeof plantSchema>;
