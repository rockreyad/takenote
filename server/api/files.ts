import { INITIAL_FILE_TAKE } from '@/lib/constant';
import { prisma } from '@/lib/prisma';
import { StoreFile } from '../zodSchema/file';

export async function getFiles(take?: number) {
  const files = await prisma.file.findMany({
    take: take || INITIAL_FILE_TAKE,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return files;
}

export async function getFileByIdOrHandle(idOrHandle: string) {
  const file = await prisma.file.findFirst({
    where: {
      OR: [
        {
          id: idOrHandle
        },
        {
          handle: idOrHandle
        }
      ]
    }
  });

  return file;
}

export async function storeSingleFile(data: StoreFile) {
  await prisma.file.create({
    data: {
      name: data.name,
      container: data.container,
      mimetype: data.mimetype,
      size: data.size,
      key: data.key,
      handle: data.handle,
      userId: data.userId
    }
  });
}

export async function getFilesByUserId(userId: string, take?: number) {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      userId
    },
    take: take || INITIAL_FILE_TAKE
  });

  return files;
}
