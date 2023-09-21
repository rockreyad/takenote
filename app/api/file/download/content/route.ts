import { NextRequest, NextResponse } from 'next/server';
import { getTranscribeByIdOrHandleOrFileId } from '@/server/api/transcribe';
import { JsonValue } from '@prisma/client/runtime/library';
import { formatTimeFromSeconds } from '@/lib/utils';

export async function GET(request: NextRequest) {
  //get fileId from request
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
  const speakerColor = (speaker: string) => {
    if (speaker === 'SPEAKER_00') return '#0007F3';
    if (speaker === 'SPEAKER_01') return '#FF7901';
    return '#056F11';
  }

  if (!fileId)
    return NextResponse.json({ error: 'File not found', status: 404 });

  const transcribe = await getTranscribeByIdOrHandleOrFileId(fileId);

  if (!transcribe)
    return NextResponse.json({ error: 'Transcribe not found!', status: 404 });

  const fileName = transcribe!.file!.name.split('.')[0];

  const content = `
    <div style="color: #4472c4;">
      <h2>TakeNote Transcription File</h2>
      <p><span style="font-weight: bold;">File Name:</span> <span>${transcribe!.file!.name}</span></p>
      <p><span style="font-weight: bold;">Creation Date:</span> <span>${transcribe!.file!.createdAt}</span></p>
      <p><span style="font-weight: bold;">User Name:</span> <span>${transcribe!.file!.user!.name}</span></p>
    </div>
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
        `<div>
          <div><span style="color: ${speakerColor(speakerId)}; margin-right: 15px;">${speakerId}</span>    <span>${startTime}</span></div>
          <div><span>${speakerText}</span></div>
          <hr style="border-width: 3px; margin-top: 15px;">
        </div>
        <br>
      `];
    }).join('');

  return NextResponse.json({
    content: content + speakerDiarizationContent,
    fileName: fileName,
    status: 200
  });
}
