'use client';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { useAnalyseData } from './AnalyseDataContext';

export const VideoAndAudio = (props: { handle: string }) => {
  const { data, loading } = useAnalyseData();
  return (
    <>
      <div className="fixed bottom-40 right-0 px-4 sm:px-6 lg:pr-8 bg-white">
        {data?.mime_type.includes('video') ? (
          <video
            src={
              `https://cdn.filestackcontent.com/${props.handle}` ||
              '/videos/example.mp4'
            }
            className="aspect-video w-72"
            autoPlay
            controls={true}
            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
          />
        ) : null}
      </div>
      <div className="z-10 fixed bottom-5 inset-x-0 px-4 sm:pl-6 lg:pl-60 sm:pr-6 lg:pr-8 ">
        {!loading ? (
          <AudioPlayer
            title={data?.file_name}
            src={`https://cdn.filestackcontent.com/${props.handle}`}
          />
        ) : null}
      </div>
    </>
  );
};
