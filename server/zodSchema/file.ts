import { z } from 'zod';

const fileStatusEnum = ['IN_PROGRESS', 'COMPLETE'] as const;
export const File_Status = z.enum(fileStatusEnum);

export const fileSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  container: z.string(),
  mimetype: z.string(),
  size: z.number(),
  key: z.string(),
  handle: z.string(),
  userId: z.string(),
  status: File_Status,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const filePreviewSchema = z.object({
  name: z.string(),
  container: z.string().optional(),
  mimetype: z.string().optional(),
  size: z.number().optional(),
  key: z.string().optional(),
  handle: z.string().optional()
});

export type File = z.infer<typeof fileSchema>;
export type StoreFile = Pick<
  File,
  'name' | 'size' | 'mimetype' | 'container' | 'handle' | 'key' | 'userId'
>;
