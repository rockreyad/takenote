'use client';

export default function TabTranscription({
  transcript
}: {
  transcript: string | undefined;
}) {
  return (
    <>
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Transcription
        </h2>
        <p className="leading-8 [&:not(:first-child)]:mt-4">{transcript}</p>
      </div>
    </>
  );
}
