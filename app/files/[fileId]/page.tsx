import { AudioPlayer } from '@/components/player/AudioPlayer';
import { parse } from 'rss-to-json';

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
    <div className="min-h-screen relative">
      <h1>Single File</h1>
      <div className="z-10 fixed bottom-10 inset-x-0 px-4 sm:pl-6 lg:pl-60 sm:pr-6 lg:pr-8 ">
        <AudioPlayer episode={episodes[0]} />
      </div>
    </div>
  );
}

export default SingleFile;
