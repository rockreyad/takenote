import { NextRequest, NextResponse } from 'next/server';
import {
  Document,
  Paragraph,
  Packer,
  TextRun,
  AlignmentType,
  Header,
  PageOrientation,
  TextEffect,
  LineRuleType,
  UnderlineType,
  VerticalAlign
} from 'docx';
import { getTranscribeByIdOrHandleOrFileId } from '@/server/api/transcribe';
import { formatTimeFromSeconds } from '@/lib/utils';
import { JsonValue } from '@prisma/client/runtime/library';

export async function GET(request: NextRequest) {
  //get fileId from request
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');

  if (!fileId) return new NextResponse('File not found', { status: 404 });

  const transcribe = await getTranscribeByIdOrHandleOrFileId(fileId);

  if (!transcribe)
    return new NextResponse('Transcribe not found!', { status: 404 });

  const speakerDiarizationData = transcribe.speakerDiarization as JsonValue[];

  // Design the Docs file https://docx.js.org/#/usage/text
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.PORTRAIT
            }
          },
          verticalAlign: VerticalAlign.TOP
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'TakeNote Transcription File',
                bold: true,
                size: 72,
                font: 'Calibri',
                color: '#FF0912',
                break: 3,
                underline: {
                  type: UnderlineType.SINGLE
                }
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `File Name: ${transcribe.file.name}`,
                size: 40,
                font: 'Calibri',
                color: '#0F1080',
                break: 1,
                underline: {
                  type: UnderlineType.SINGLE
                }
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Creation Date: ${transcribe.file.createdAt}`,
                size: 40,
                font: 'Calibri',
                color: '#0F1080',
                break: 1
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `User Name: ${transcribe.file.user.name}`,
                size: 40,
                font: 'Calibri',
                color: '#0F1080',
                break: 1
              })
            ]
          })
        ]
      },
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                bold: true,
                text: 'Transcript',
                size: 24,
                font: 'Calibri',
                color: '#000000',
                style: 'header'
              })
            ]
          }),
          new Paragraph({
            text: transcribe.transcript as string,
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              lineRule: LineRuleType.AUTO,
              line: 360,
              before: 120,
              after: 120
            },
            keepNext: true,
            wordWrap: true,
            style: 'default'
          })
        ]
      },
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'Speaker Diarization',
                size: 24,
                bold: true,
                font: 'Calibri',
                color: '#000000',
                style: 'header'
              })
            ]
          }),
          ...speakerDiarizationData
            .map((entry: any) => {
              const speakerId = entry.speaker;
              const startTime = formatTimeFromSeconds(entry.start);
              const speakerText = entry.text;
              return [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '  ',
                      size: 20,
                      break: 1
                    }),
                    new TextRun({
                      text: `${speakerId}          `,
                      size: 20,
                      font: 'Calibri',
                      style: 'default',
                      color:
                        speakerId === 'SPEAKER_00'
                          ? '#0007F3'
                          : speakerId === 'SPEAKER_01'
                          ? '#FF7901'
                          : '#056F11'
                    }),
                    new TextRun({
                      text: `     ${startTime}`,
                      size: 20,
                      font: 'Calibri',
                      style: 'default',
                      color: '#000000'
                    })
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: {
                    before: 200,
                    afterAutoSpacing: true
                  }
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: speakerText,
                      size: 22,
                      font: 'Calibri',
                      style: 'default',
                      color: '#000000'
                    })
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: {
                    after: 200,
                    before: 200
                  },
                  thematicBreak: true
                })
              ];
            })
            .flat() // Use flat() to flatten the array of paragraphs
        ]
      }
    ],
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
