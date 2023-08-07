import { File_Status } from '@/types/file';
import { z } from 'zod';

const fileSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  container: z.string(),
  mimetype: z.string(),
  size: z.number(),
  key: z.string(),
  handle: z.string(),
  userId: z.string(),
  status: z.nativeEnum(File_Status).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type File = z.infer<typeof fileSchema>;
