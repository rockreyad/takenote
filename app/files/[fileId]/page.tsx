import { AudioPlayer } from '@/components/player/AudioPlayer';
import { parse } from 'rss-to-json';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabTranscription from './__components__/TabTrnscription';
import TabSentiment from './__components__/TabSentiment';
import TabSummary from './__components__/TabSummary';
import TabSpeakerDiarisation from './__components__/TabSpeakerDiarisation';

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
      <div className="">
        <Tabs
          defaultValue="transcription"
          className="max-w-4xl 3xl:max-w-7xl space-y-8"
        >
          <TabsList className="grid max-w-4xl grid-cols-2 lg:grid-cols-4 gap-2 bg-primary/10 h-auto text-gray-800">
            <TabsTrigger
              value="transcription"
              className="border border-primary/5"
            >
              Transcription
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="border border-primary/5">
              Sentiment
            </TabsTrigger>
            <TabsTrigger value="summary" className="border border-primary/5">
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="speaker_diarization"
              className="border border-primary/5"
            >
              Speaker Diarization
            </TabsTrigger>
          </TabsList>
          <TabsContent value="transcription">
            <TabTranscription />
          </TabsContent>
          <TabsContent value="sentiment">
            <TabSentiment />
          </TabsContent>
          <TabsContent value="summary">
            <TabSummary />
          </TabsContent>
          <TabsContent value="speaker_diarization">
            <TabSpeakerDiarisation />
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-40 right-0 px-4 sm:pl-6 lg:pl-60 sm:pr-6 lg:pr-8">
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
  );
}

export default SingleFile;
