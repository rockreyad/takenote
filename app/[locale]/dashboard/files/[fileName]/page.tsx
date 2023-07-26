import { AudioPlayer } from '@/components/player/AudioPlayer';
import { parse } from 'rss-to-json';

import { AnalyseDataProvider } from './__components__/AnalyseDataContext';
import AnalyseDataTab from './__components__/AnalyseDataTab';

async function getEpisodes() {
  let feed = await parse('https://their-side-feed.vercel.app/api/feed');

  return feed.items.map(
    ({ id, title, description, enclosures, published }) => ({
      id,
      title: `${id}: ${title}`,
      published,
      description,
      audio: enclosures.map((enclosure: any) => ({
        src: enclosure.url,
        type: enclosure.type
      }))[0]
    })
  );
}

async function SingleFile() {
  const episodes = await getEpisodes();
  return (
    <AnalyseDataProvider>
      <div className="min-h-screen relative pb-32">
        <div className="">
          <AnalyseDataTab />
        </div>

        <div className="fixed bottom-40 right-0 px-4 sm:px-6 lg:pr-8 bg-white">
          <video
            src="/videos/example.mp4"
            className="aspect-video w-72"
            autoPlay
            controls
            controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
          />
        </div>
        <div className="z-10 fixed bottom-5 inset-x-0 px-4 sm:pl-6 lg:pl-60 sm:pr-6 lg:pr-8 ">
          <AudioPlayer episode={episodes[0]} />
        </div>
      </div>
    </AnalyseDataProvider>
  );
}

export default SingleFile;
