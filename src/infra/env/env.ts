import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_NAME: z.string(),
  DATABASE_MIN_POOL_SIZE: z.coerce.number().default(1),
  DATABASE_MAX_POOL_SIZE: z.coerce.number().default(10),
  COLLECTION_NAME: z.string().default('products'),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;
