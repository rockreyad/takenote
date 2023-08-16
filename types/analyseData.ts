import { JsonValue } from '@prisma/client/runtime/library';

export interface Sentiment {
  label: string;
  score: number;
}
export interface SpeakerDiarization {
  end: number;
  speaker: string;
  start: number;
  text: string;
}
export interface AnalyseData {
  file_name?: string;
  file?: {
    name?: string;
  };
  sentiment?: Sentiment[] | JsonValue | null;
  speaker_diarization?: SpeakerDiarization[];
  speakerDiarization?: JsonValue | null;
  transcript?: string | null;
}
