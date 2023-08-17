import api from '@/lib/axios';
import { storeTranscribe } from '@/server/api/transcribe';

export const generatedTranscribe = async (filekey: string, fileId: string) => {
  const transcription = await api
    .post(
      '/transcribe/file',
      {
        file_name: filekey
      },
      {
        timeout: 1000 * 60 * 12
      }
    )
    .catch((error) => {
      throw error;
    });
  const storedTranscribe = await storeTranscribe({
    fileId: fileId,
    transcript: transcription.data.transcript,
    sentiment: transcription.data.sentiment,
    speakerDiarization: transcription.data.speaker_diarization
  });

  return storedTranscribe[0];
};
