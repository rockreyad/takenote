import { z } from 'zod';
import { filePreviewSchema } from '../zodSchema/file';

export const transcribePreviewSchema = z.object({
  file: filePreviewSchema,
  transcript: z.string().optional(),
  sentiment: z
    .array(
      z.object({
        label: z.string(),
        score: z.number()
      })
    )
    .optional(),
  speakerDiarization: z
    .array(
      z.object({
        end: z.number(),
        speaker: z.string(),
        start: z.number(),
        text: z.string()
      })
    )
    .optional()
});

export const transcribeSchema = z.object({
  id: z.string().optional(),
  fileId: z.string(),
  transcript: z.string().optional(),
  sentiment: z
    .array(
      z.object({
        label: z.string(),
        score: z.number()
      })
    )
    .optional(),
  speakerDiarization: z
    .array(
      z.object({
        end: z.number(),
        speaker: z.string(),
        start: z.number(),
        text: z.string()
      })
    )
    .optional()
});

export type Transcription = z.infer<typeof transcribePreviewSchema>;
export type Transcribe = z.infer<typeof transcribeSchema>;
