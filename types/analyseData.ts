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
  file_name: string;
  sentiment: Sentiment[];
  speaker_diarization: SpeakerDiarization[];
  transcript: string;
}
