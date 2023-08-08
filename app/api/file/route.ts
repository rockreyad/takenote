import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import {
  getFiles,
  getFilesByUserId,
  storeSingleFile
} from '@/server/api/files';
import { File } from '@/server/zodSchema/file';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'UnAuthenticated', status: 401 });
  }
  try {
    // user : fetch all files from prisma
    if (session.user.role === 'USER') {
      const files = await getFilesByUserId(session.user.id);
      return NextResponse.json({ message: 'Ok', status: 200, files });
    }

    if (session.user.role === 'ADMIN') {
      const files = await getFiles();
      return NextResponse.json({ message: 'Ok', status: 200, files });
    }

    const files = await getFilesByUserId('cll0ihof30000l608izlrxwka');
    return NextResponse.json({ message: 'Ok', status: 200, files });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error
    });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'UnAuthenticated', status: 401 });
  }
  try {
    const { name, size, mimetype, container, handle, key }: File =
      await request.json();

    if (!name || !size || !mimetype || !container || !handle || !key) {
      return NextResponse.json({ message: 'Bad Request', status: 400 });
    }

    const fileInfo = {
      name,
      size,
      mimetype,
      container,
      handle,
      key,
      userId: session.user.id
    };

    // Save data to prisma
    await storeSingleFile(fileInfo);

    return NextResponse.json({ message: 'File has been stored!', status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error
    });
  }
}
