import { INITIAL_FILE_TAKE } from '@/lib/constant';
import { prisma } from '@/lib/prisma';
import { File } from '../zodSchema/file';

export async function getFiles() {
  const files = await prisma.file.findMany({
    take: INITIAL_FILE_TAKE,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return files;
}

export async function storeSingleFile(data: File) {
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
