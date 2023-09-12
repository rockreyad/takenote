import { NextRequest, NextResponse } from 'next/server';
import { getTranscribeByIdOrHandleOrFileId } from '@/server/api/transcribe';
import { JsonValue } from '@prisma/client/runtime/library';

export async function GET(request: NextRequest) {
  //get fileId from request
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) return NextResponse.json({ error: 'File not found', status: 404 });

  const transcribe = await getTranscribeByIdOrHandleOrFileId(fileId);

  if (!transcribe) return NextResponse.json({ error: 'Transcribe not found!', status: 404 });

  const content = `
    TakeNote Transcription File
    File Name: ${transcribe!.file!.name}
    Creation Date: ${transcribe!.file!.createdAt}
    User Name: ${transcribe!.file!.user!.name}
    `;

  return NextResponse.json({
    content: content,
    status: 200
  });
}
