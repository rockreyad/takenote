import { AudioPlayer } from '@/components/player/AudioPlayer';
import { parse } from 'rss-to-json';

import { AnalyseDataProvider } from './__components__/AnalyseDataContext';
import AnalyseDataTab from './__components__/AnalyseDataTab';
import { prisma } from '@/lib/prisma';

async function getEpisodes(fileId: string) {
  const file = await prisma.file.findUnique({
    where: {
      id: fileId
    },
    select: {
      name: true,
      id: true,
      handle: true
    }
  });
  console.log('audioFile', file);
  if (!file) {
    return null;
  }
  return {
    id: file.id,
    title: file.name,
    audio: {
      src: `https://cdn.filestackcontent.com/${file?.handle}`,
      type: 'audio/mpeg'
    }
  };
}

async function SingleFile({ params }: { params: { fileName: string } }) {
  const fileId = params.fileName;
  console.log('fileId', fileId);
  const episodes = await getEpisodes(fileId);
  console.log('episodes', episodes);
  return (
    <AnalyseDataProvider>
      <div className="min-h-screen relative pb-32">
        <div className="">
          <AnalyseDataTab />
        </div>
        {episodes?.audio.type !== 'audio/mpeg' ? (
          <div className="fixed bottom-40 right-0 px-4 sm:px-6 lg:pr-8 bg-white">
            <video
              src="/videos/example.mp4"
              className="aspect-video w-72"
              autoPlay
              controls
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
            />
          </div>
        ) : null}

        {episodes && (
          <div className="z-10 fixed bottom-5 inset-x-0 px-4 sm:pl-6 lg:pl-60 sm:pr-6 lg:pr-8 ">
            <AudioPlayer episode={episodes} />
          </div>
        )}
      </div>
    </AnalyseDataProvider>
  );
}

export default SingleFile;
