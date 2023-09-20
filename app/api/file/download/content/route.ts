import { NextRequest, NextResponse } from 'next/server';
import { getTranscribeByIdOrHandleOrFileId } from '@/server/api/transcribe';
import { JsonValue } from '@prisma/client/runtime/library';
import { formatTimeFromSeconds } from '@/lib/utils';

export async function GET(request: NextRequest) {
  //get fileId from request
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');

  if (!fileId)
    return NextResponse.json({ error: 'File not found', status: 404 });

  const transcribe = await getTranscribeByIdOrHandleOrFileId(fileId);

  if (!transcribe)
    return NextResponse.json({ error: 'Transcribe not found!', status: 404 });

  const fileName = transcribe!.file!.name.split('.')[0];

  const content = `
    <h2>TakeNote Transcription File</h2>
    <p>File Name: ${transcribe!.file!.name}</p>
    <p>Creation Date: ${transcribe!.file!.createdAt}</p>
    <p>User Name: ${transcribe!.file!.user!.name}</p>
    <br>
    <h3>Transcript</h3>
    <p>${transcribe!.transcript}</p>
    <br>
    <h3>Speaker Diarization</h3>
    `;

  const speakerDiarizationData = transcribe.speakerDiarization as JsonValue[];
  const speakerDiarizationContent = speakerDiarizationData
    .map((entry: any) => {
      const speakerId = entry.speaker;
      const startTime = formatTimeFromSeconds(entry.start);
      const speakerText = entry.text;
      return [
        `<div>${speakerId}    ${startTime}</div>
    <div><p>${speakerText}</p></div>
    <br>
  `];
    }).join('');

  return NextResponse.json({
    content: content + speakerDiarizationContent,
    fileName: fileName,
    status: 200
  });
}
