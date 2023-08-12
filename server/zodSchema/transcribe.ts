import { z } from 'zod';

export const transcribeSchema = z.object({
  file_name: z.string(),
  mime_type: z.string(),
  sentiment: z.array(
    z.object({
      label: z.string(),
      score: z.number()
    })
  ),
  speaker_diarization: z.array(
    z.object({
      end: z.number(),
      speaker: z.string(),
      start: z.number(),
      text: z.string()
    })
  ),
  transcript: z.string()
});

export type Transcription = z.infer<typeof transcribeSchema>;
