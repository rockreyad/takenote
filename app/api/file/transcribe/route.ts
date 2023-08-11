import { authOptions } from '@/lib/auth';
import api from '@/lib/axios';
import { getFileByIdOrHandle } from '@/server/api/files';
import { Transcription } from '@/server/zodSchema/transcribe';
import { AnalyseData } from '@/types/analyseData';
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
    //if yes, return transcription
    const generatedTranscribe = await api
      .post(
        '/transcribe/file',
        {
          file_name: files.key
        },
        {
          timeout: 1000 * 60 * 12
        }
      )
      .catch((error) => {
        throw error;
      });

    if (!generatedTranscribe.data) {
      return NextResponse.json({
        message: 'Transcription could not be generated',
        status: 500,
        error: 'No data'
      });
    }

    // eslint-disable-next-line no-unused-vars
    const { file_name, ...restOfOhers } =
      generatedTranscribe.data as AnalyseData;

    const formattedData: Transcription = {
      file_name: files.name,
      mime_type: files.mimetype,
      ...restOfOhers
    };

    return NextResponse.json({
      message: 'Ok',
      status: 200,
      data: formattedData
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong',
      status: 500,
      error
    });
  }
}
