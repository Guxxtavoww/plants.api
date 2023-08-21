import { z } from 'zod';

export const userResponseSchema = z.object({
  user_id: z.number().optional().nullable(),
  user_name: z.string().optional().nullable(),
  email: z.string().email(),
  profile_pic_url: z.string().optional().nullable(),
  created_at: z.date().optional().nullable(),
  updated_at: z.date().optional().nullable(),
});

export const userSchema = z.object({
  user_id: z.number().optional().nullable(),
  user_name: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string().max(18).optional(),
  profile_pic_url: z.string().optional().nullable(),
  created_at: z.date().optional().nullable(),
  updated_at: z.date().optional().nullable(),
});

export const usersResponseSchema = z.array(userResponseSchema);

export type UserType = z.infer<typeof userSchema>;

export type UserResponse = z.infer<typeof userResponseSchema>;

export const userIdSchema = z
  .string()
  .nonempty()
  .transform((user_id) => {
    const newValue = Number(user_id);

    if (Number.isNaN(newValue)) return null;

    return newValue;
  });
