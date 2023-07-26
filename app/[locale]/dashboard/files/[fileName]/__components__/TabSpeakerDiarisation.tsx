import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SpeakerDiarization } from '@/types/analyseData';
import { Play } from 'lucide-react';

const speackerColor = {
  SPEAKER_00: 'text-primary',
  SPEAKER_01: 'text-blue-500',
  SPEAKER_02: 'text-green-500'
};

export default function TabSpeakerDiarisation({
  speakerDiarization
}: {
  speakerDiarization: SpeakerDiarization[] | undefined;
}) {
  return (
    <>
      <div className="space-y-8">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Diarisation
        </h2>
        {speakerDiarization?.length
          ? speakerDiarization.map((item, index) => (
              <div key={index}>
                <div className="leading-8 flex items-center gap-4">
                  <p
                    className={cn('font-semibold', {
                      [speackerColor[
                        item.speaker as keyof typeof speackerColor
                      ]]: item.speaker
                    })}
                  >
                    {item.speaker}
                  </p>
                  <Separator
                    orientation="vertical"
                    className="bg-gray-400 h-4"
                  />
                  <span className="flex items-center gap-2 cursor-pointer">
                    <Play className="h-4 w-4 text-black" />
                    {item.start}
                  </span>
                </div>
                <blockquote className="mt-6 border-l-2 border-primary pl-6 italic">
                  {item.text}
                </blockquote>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
