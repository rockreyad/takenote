import { Metadata } from 'next';
import FileUploaderList from './__components__/FileUploaderList';
import { TopSection } from './__components__/TopSection';

export const metadata: Metadata = {
  title: 'Upload - TakeNote',
  description: ''
};

export default function Index() {
  return (
    <div className="space-y-10">
      <TopSection
        title="Order English Transcripts by a Professional Transcriber"
        description="Professionals transcribe your files to 99% accuracy"
      />
      <p>Add English Files for Price and Turnaround</p>
      <FileUploaderList />
    </div>
  );
}
