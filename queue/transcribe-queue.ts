/* eslint-disable no-console */
import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import { env } from '@/env.mjs';
import { storeTranscribe } from '@/server/api/transcribe';
import mailQueue from './transcribe-mail-queue';
import axios from 'axios';
import { updateFileById } from '@/server/api/files';
import { File_Status } from '@/server/zodSchema/file';

const BACKEND_URL = env.BACKEND_URL as string;

const QueueName = 'transcribe-queue';
const connection: ConnectionOptions = {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  username: env.REDIS_USER,
  password: env.REDIS_PASSWORD,
  connectTimeout: Number(env.REDIS_TIMEOUT),
  retryStrategy: (times: number) => {
    return Math.max(Math.min(Math.exp(times), 20000), 1000);
  },
  maxRetriesPerRequest: 10
};

const queue = new Queue(QueueName, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'fixed',
      delay: 1000
    }
  }
});

const worker = new Worker(
  QueueName,
  async (job: Job) => {
    const { filekey, fileId, baseUrl } = job.data;

    try {
      const transcription = await axios.post(`${BACKEND_URL}/transcribe/file`, {
        file_name: filekey
      });
      const storedTranscribe = await storeTranscribe({
        fileId: fileId,
        transcript: transcription.data.transcript,
        sentiment: transcription.data.sentiment,
        speakerDiarization: transcription.data.speaker_diarization
      });
      // return
      return {
        emailTo: storedTranscribe[0].file.user.email,
        name: storedTranscribe[0].file.user.name,
        fileName: storedTranscribe[0].file.name,
        fileHandle: storedTranscribe[0].file.handle,
        fileStatus: storedTranscribe[1].status,
        baseUrl
      };
    } catch (error) {
      throw error;
    }
  },
  {
    connection: {
      ...connection,
      maxRetriesPerRequest: null
    }
  }
);
worker.on('completed', async (job: Job) => {
  // Send notification to the user about the job complete
  console.log(`Job completed with result ${job.id}`);
  console.log('Job completed, Add mail queue');
  // transcribeStored[0].file.user.name
  // transcribeStored[0].file.user.email
  // transcribeStored[0].file.name
  // transcribeStored[0].file.status
  const { emailTo, name, fileName, fileHandle, fileStatus, baseUrl } =
    job.returnvalue;
  await mailQueue.add(
    `mail-${job.data.filekey}`,
    {
      emailTo,
      name,
      fileName,
      fileHandle,
      fileStatus,
      baseUrl
    },
    {
      removeOnComplete: true,
      removeOnFail: true
    }
  );
});
worker.on('failed', async (job, err) => {
  // Send notification to the user about the job failed
  console.log(`Job ${job?.id} failed with ${err.message}`);
  await updateFileById(job?.data.fileId, {
    status: File_Status.Enum.ERROR
  });
});

process.on('SIGINT', async () => {
  await worker.close();
});

export default queue;
