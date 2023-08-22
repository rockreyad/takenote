/* eslint-disable no-console */
/**
 * We are still not using this DLQ queue, but we will use it in the future
 */

import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import { env } from '@/env.mjs';

const QueueName = 'transcribe-DLQ';
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
  connection
});

const worker = new Worker(
  QueueName,
  async (job: Job) => {
    console.log(job.data);
    return job.data;
  },
  {
    connection: {
      ...connection,
      maxRetriesPerRequest: null
    }
  }
);

worker.on('completed', (job: Job) => {
  // Send notification to the user about the job complete
  console.log(`Job completed with result ${job.id}`);
  console.log(job.returnvalue);
});
worker.on('failed', (job, err) => {
  // Send notification to the user about the job failed
  console.log(`Job ${job?.id} failed with ${err.message}`);
});

export default queue;
