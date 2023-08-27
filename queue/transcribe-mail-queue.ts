/* eslint-disable no-console */
import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import { env } from '@/env.mjs';
import resend from '@/lib/resend';
import { File_Status } from '@/server/zodSchema/file';

const QueueName = 'transcribe-mail-queue';
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
// Mail queue
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
// Mail worker
const worker = new Worker(
  QueueName,
  async (job: Job) => {
    // TODO: Send email
    try {
      const { emailTo, name, fileName, fileHandle, fileStatus, baseUrl } =
        job.data;
      const emailSubject =
        fileStatus === File_Status.Enum.COMPLETE
          ? 'Your transcription is ready!'
          : File_Status.enum.ERROR
          ? 'Your transcription has failed!'
          : 'Your transcription has failed!';
      const stat =
        fileStatus === File_Status.Enum.COMPLETE ? 'Complete' : 'Error';
      const { id } = await resend.emails.send({
        from: env.RESEND_TRANSCRIPTION_STATUS_EMAIL as string,
        to: emailTo,
        subject: emailSubject,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
            <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="padding: 20px;">
                  <h2 style="color: #333333; margin-bottom: 10px;">${emailSubject}</h2>
                  <p style="color: #666666; margin-top: 0;">Dear, ${name}</p>
                  ${fileStatus === File_Status.Enum.COMPLETE ? 
                    `<p style="color: #666666;">
                      Your AI Transcription is complete.<br>
                      You can view and download it here.
                    </p>` 
                    : 
                    `<p style="color: #666666;">
                      Your AI transcription has failed.<br>
                      You can try it again or contact customer support.
                    </p>`
                  }
                  <p style="color: #666666;">
                    Your AI Transcription is complete.<br>
                    You can view and download it here.
                  </p>

                  <table style="width: 100%; margin-top: 20px;">
                    <tr>
                      <td style="color: #333333; font-weight: bold;">File name:</td>
                      <td style="color: #666666;">${fileName}</td>
                    </tr>
                    <tr>
                      <td style="color: #333333; font-weight: bold;">Status:</td>
                      <td style="color: #666666;">${stat}</td>
                    </tr>
                  </table>
                  ${fileStatus === File_Status.Enum.COMPLETE ?
                    `<p>Click <a href="${baseUrl}/dashboard/files/${fileHandle}" target="_blank">here</a> to view and download</p>`
                    :
                    `<p>Click <a href="#" target="_blank">here</a> to contact customer support.</p>`
                  }
                </td>
              </tr>
            </table>
          </body>
          </html>
          `});
      return id;
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
  console.log(`Email Job completed with result ${job.id}`);
});
worker.on('failed', async (job, err) => {
  // Send notification to the user about the job failed
  console.log(`Email Job ${job?.id} failed with ${err.message}`);
});

process.on('SIGINT', async () => {
  await worker.close();
});

export default queue;
