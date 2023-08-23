import { NextRequest, NextResponse } from 'next/server';
import { Document, Paragraph, Packer, TextRun, AlignmentType } from 'docx';
import { getTranscribeByIdOrHandleOrFileId } from '@/server/api/transcribe';

export async function GET(request: NextRequest) {
  //get fileId from request
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) return new NextResponse('File not found', { status: 404 });

  const transcribe = await getTranscribeByIdOrHandleOrFileId(fileId);

  if (!transcribe)
    return new NextResponse('Transcribe not found!', { status: 404 });

  // Design the Docs file https://docx.js.org/#/usage/text
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Transcribe', bold: true, size: 32 })
            ]
          })
        ]
      },
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(('File Name: ' + transcribe.file.name) as string),
              new TextRun(transcribe.transcript as string)
            ]
          })
        ]
      }
      // {
      //   properties: {},
      //   children: [
      //     new Paragraph({
      //       children: [
      //         new TextRun('Speaker Diarization: '),
      //         new TextRun(transcribe.speakerDiarization as string)
      //       ]
      //     })
      //   ]
      // }
    ],
    // generate note : transcribe generate by Takenote.ai
    footnotes: {
      1: {
        children: [
          new Paragraph({
            text: 'Transcribe generate by Takenote.ai',
            alignment: AlignmentType.CENTER,
            style: 'footer'
          })
        ]
      }
    }
  });
  const buffer = await Packer.toBuffer(doc).then((buffer) => buffer);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=document.docx'
    }
  });
}
