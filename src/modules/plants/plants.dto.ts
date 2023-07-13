import { z } from 'zod';

export const plantSchema = z.object({
  regular_name: z.string().nonempty(),
  scientific_name: z.string().optional(),
});

export const plantArraySchema = z.array(plantSchema);

export type PlantType = z.infer<typeof plantSchema>;
