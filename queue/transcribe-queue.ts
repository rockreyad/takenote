import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import api from '@/lib/axios';
import { env } from '@/env.mjs';
import { storeTranscribe } from '@/server/api/transcribe';
// import mailQueue from './transcribe-mail-queue';

const QueueName = 'transcribe-queue';
const connection: ConnectionOptions = {
  host: env.REDIS_HOST, // Replace with your Redis server's host
  port: Number(env.REDIS_PORT) // Replace with your Redis server's port
};

const queue = new Queue(QueueName, {
  connection
});

const worker = new Worker(
  QueueName,
  async (job: Job) => {
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
  },
  {
    connection
  }
);
worker.on('completed', async (job: Job) => {
  // Send notification to the user about the job complete
  console.log(`Job completed with result ${job.id}`);
  // console.log(job.returnvalue);
  console.log('Job completed, Add mail queue');
  // await mailQueue.add(`mail-${job.data.filekey}`, {});
});
worker.on('failed', (job, err) => {
  // Send notification to the user about the job failed
  console.log(`Job ${job?.id} failed with ${err.message}`);
});

export default queue;
