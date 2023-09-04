'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabTranscription from './TabTrnscription';
import TabSentiment from './TabSentiment';
import TabSpeakerDiarisation from './TabSpeakerDiarisation';
import FullPageLoading from '@/components/full-page-loading';
import { useAnalyseData } from './AnalyseDataContext';
import { notFound } from 'next/navigation';

const AnalyseDataTab = () => {
  const { loading: isLoading, isError, data } = useAnalyseData();
  if (isLoading) return <FullPageLoading />;
  if (isError) notFound();
  return (
    <Tabs
      defaultValue="transcription"
      className="max-w-4xl 3xl:max-w-7xl space-y-8"
    >
      <TabsList className="grid max-w-4xl grid-cols-2 lg:grid-cols-3 gap-2 bg-primary/10 h-auto text-gray-800">
        <TabsTrigger value="transcription" className="border border-primary/5">
          Transcription
        </TabsTrigger>
        <TabsTrigger value="sentiment" className="border border-primary/5">
          Sentiment
        </TabsTrigger>
        {/* <TabsTrigger value="summary" className="border border-primary/5">
            Summary
          </TabsTrigger> */}
        <TabsTrigger
          value="speaker_diarization"
          className="border border-primary/5"
        >
          Speaker Diarization
        </TabsTrigger>
      </TabsList>
      <TabsContent value="transcription">
        <TabTranscription transcript={data?.transcript} />
      </TabsContent>
      <TabsContent value="sentiment">
        <TabSentiment sentimentData={data?.sentiment} speakerDiarization={data?.speakerDiarization} />
      </TabsContent>
      {/* <TabsContent value="summary">
          <TabSummary />
        </TabsContent> */}
      <TabsContent value="speaker_diarization">
        <TabSpeakerDiarisation speakerDiarization={data?.speakerDiarization} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyseDataTab;
