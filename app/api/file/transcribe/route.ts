import { authOptions } from '@/lib/auth';
import { getFileByIdOrHandle } from '@/server/api/files';
import { getTranscribeByIdOrHandleOrFileId } from '@/server/api/transcribe';
import { File_Status } from '@/server/zodSchema/file';
import { Transcription } from '@/server/zodSchema/transcribe';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idOrHandle = searchParams.get('idOrHandle');

  if (!idOrHandle) {
    return NextResponse.json({ message: 'Bad Request', status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'UnAuthenticated', status: 401 });
    }

    //check if user uploaded this file
    const files = await getFileByIdOrHandle(idOrHandle);
    //if not, return 401
    if (!files) {
      return NextResponse.json({ message: 'No files found!', status: 404 });
    }

    if (session.user.role === 'USER') {
      if (files.userId !== session.user.id) {
        return NextResponse.json({ message: 'Unauthorized', status: 401 });
      }
    }

    let transcription;
    switch (files.status) {
      case File_Status.enum.COMPLETE:
        transcription = await getTranscribeByIdOrHandleOrFileId(files.id);
        break;
      default:
        NextResponse.json({ message: 'File is not ready', status: 400 });
        break;
    }

    if (!transcription)
      return NextResponse.json({
        message: 'No transcription found! Please reload the page.',
        status: 404
      });

    return NextResponse.json({
      message: 'Ok',
      status: 200,
      data: transcription as Transcription
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error
    });
  }
}
