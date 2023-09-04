import { prisma } from '@/lib/prisma';
import { Transcribe } from '../zodSchema/transcribe';
import { File_Status } from '../zodSchema/file';

export async function getTranscribeByIdOrHandleOrFileId(
  idOrHandleOrFileId: string
) {
  const transcribe = await prisma.transcribe.findFirst({
    where: {
      OR: [
        {
          id: idOrHandleOrFileId
        },
        {
          file: {
            handle: idOrHandleOrFileId
          }
        },
        {
          fileId: idOrHandleOrFileId
        }
      ]
    },
    select: {
      file: {
        select: {
          name: true,
          mimetype: true,
          user: {
            select: {
              name: true
            }
          },
          createdAt: true
        }
      },
      transcript: true,
      sentiment: true,
      speakerDiarization: true
    }
  });
  return transcribe;
}

export async function storeTranscribe(data: Transcribe) {
  const transcribeStored = await prisma.$transaction([
    prisma.transcribe.create({
      data: {
        file: {
          connect: {
            id: data.fileId
          }
        },
        transcript: data.transcript,
        sentiment: data.sentiment,
        speakerDiarization: data.speakerDiarization
      },
      select: {
        file: {
          select: {
            name: true,
            status: true,
            handle: true,
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        },
        transcript: true,
        sentiment: true,
        speakerDiarization: true
      }
    }),
    prisma.file.update({
      where: {
        id: data.fileId
      },
      data: {
        status: File_Status.enum.COMPLETE
      },
      select: {
        status: true
      }
    })
  ]);
  return transcribeStored;
}
