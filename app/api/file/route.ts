import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import {
  deleteFileById,
  getFileByIdOrHandle,
  getFiles,
  getFilesByUserId,
  storeSingleFile
} from '@/server/api/files';
import { File } from '@/server/zodSchema/file';
import { getUser } from '@/server/api/user';
import transcribeQueue from '@/queue/transcribe-queue';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'UnAuthenticated', status: 401 });
  }
  try {
    let files;
    switch (session.user.role) {
      case 'USER':
        files = await getFilesByUserId(session.user.id);
        break;
      case 'ADMIN':
        files = await getFiles();
        break;
      default:
        break;
    }
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
    try {
      const file = await storeSingleFile(fileInfo);
      // Add transcribe job to queue
      await transcribeQueue.add(
        `file-${fileInfo.key}`,
        {
          filekey: fileInfo.key,
          fileId: file.id,
          baseUrl: request.nextUrl.origin
        },
        {
          removeOnComplete: true,
          removeOnFail: true
        }
      );
    } catch (error) {
      throw error;
    }

    return NextResponse.json({ message: 'File has been stored!', status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error
    });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'UnAuthenticated', status: 401 });
  }
  try {
    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json({ message: 'Bad Request', status: 400 });
    }

    let user;
    if (session.user.id) {
      user = await getUser(session.user.id);
      if (!user) {
        return NextResponse.json({ message: 'Unauthorized', status: 401 });
      }
    }

    let files;
    switch (user?.roles) {
      case 'USER':
        files = await getFileByIdOrHandle(fileId);
        if (!files) {
          return NextResponse.json({ message: 'No files found!', status: 404 });
        }
        if (files.userId !== session.user.id) {
          return NextResponse.json({ message: 'Unauthorized', status: 401 });
        }
        break;
      case 'ADMIN':
        break;
      default:
        break;
    }

    // Just Update the deletedAt field
    await deleteFileById(fileId);

    return NextResponse.json({
      message: 'File has been deleted!',
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error
    });
  }
}
