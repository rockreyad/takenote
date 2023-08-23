import { INITIAL_FILE_TAKE } from '@/lib/constant';
import { prisma } from '@/lib/prisma';
import { StoreFile } from '../zodSchema/file';

export async function getFiles(take?: number) {
  const files = await prisma.file.findMany({
    take: take || INITIAL_FILE_TAKE,
    where: {
      deletedAt: null
    },
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
          id: idOrHandle,
          deletedAt: null
        },
        {
          handle: idOrHandle,
          deletedAt: null
        }
      ]
    }
  });

  return file;
}

export async function storeSingleFile(data: Omit<StoreFile, 'status'>) {
  try {
    const file = await prisma.file.create({
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
    return file;
  } catch (error) {
    throw error;
  }
}

export async function getFilesByUserId(
  userId: string,
  includeDeleted: boolean = false,
  take?: number
) {
  const files = await prisma.file.findMany({
    where: {
      userId,
      OR: [
        { deletedAt: includeDeleted ? { not: null } : null }, // Include deleted files if includeDeleted is true
        { deletedAt: null }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: take || INITIAL_FILE_TAKE
  });

  return files;
}

export async function deleteFileById(id: string) {
  await prisma.file.update({
    where: {
      id
    },
    data: {
      deletedAt: new Date()
    }
  });
}

export async function updateFileById(id: string, data: Partial<StoreFile>) {
  return await prisma.file.update({
    where: {
      id
    },
    data
  });
}
