import { prisma } from '@/lib/prisma';

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      image: true,
      roles: true
    }
  });

  return user;
}
