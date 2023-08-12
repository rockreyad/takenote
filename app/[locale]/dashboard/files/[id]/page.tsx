import { AnalyseDataProvider } from './__components__/AnalyseDataContext';
import AnalyseDataTab from './__components__/AnalyseDataTab';
import { VideoAndAudio } from './__components__/VideoAndAudio';

async function SingleFile({ params }: { params: { id: string } }) {
  const fileId = params.id;

  return (
    <AnalyseDataProvider idOrHandle={fileId}>
      <div className="min-h-screen relative pb-32">
        <div className="">
          <AnalyseDataTab />
        </div>
        <VideoAndAudio handle={fileId} />
      </div>
    </AnalyseDataProvider>
  );
}

export default SingleFile;
