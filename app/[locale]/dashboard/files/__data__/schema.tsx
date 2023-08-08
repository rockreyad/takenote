import { File_Status } from '@prisma/client';
import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string().optional(),
  key: z.string().optional(),
  title: z.string(),
  status: z.nativeEnum(File_Status).optional(),
  create_at: z.date().optional(),
  handle: z.string().optional()
});

export type Task = z.infer<typeof taskSchema>;
