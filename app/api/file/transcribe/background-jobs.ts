// background-jobs.ts
import Bull from 'bull';
import api from '@/lib/axios';
import { storeTranscribe } from '@/server/api/transcribe';
import { env } from '@/env.mjs';

const transcribeQueue = new Bull('transcribe-queue', {
  redis: {
    host: env.REDIS_HOST, // Replace with your Redis server's host
    port: Number(env.REDIS_PORT) // Replace with your Redis server's port
  }
});

transcribeQueue.process(async (job) => {
  const { filekey, fileId } = job.data;

  try {
    const transcription = await api.post('/transcribe/file', {
      file_name: filekey
    });

    const storedTranscribe = await storeTranscribe({
      fileId: fileId,
      transcript: transcription.data.transcript,
      sentiment: transcription.data.sentiment,
      speakerDiarization: transcription.data.speaker_diarization
    });

    return storedTranscribe[0];
  } catch (error) {
    throw error;
  }
});

export default transcribeQueue;
