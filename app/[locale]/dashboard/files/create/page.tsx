import { Metadata } from 'next';
import FileUploaderList from './__components__/file-uploader-list';
import { TopSection } from './__components__/top-section';
import TooltipInfo from './__components__/tool-tip-info';

export const metadata: Metadata = {
  title: 'Upload - TakeNote',
  description: ''
};

export default function FileUploadPage() {
  return (
    <div className="space-y-10">
      <TopSection
        title="Generate powerful content by transcribing audio & video with TakeNote AI"
        description="Transcribe, summarize, search and analyse"
      />
      <div className="space-y-2">
        <p className="text-xl font-light tracking-wide flex items-center space-x-2">
          <span> 5 free upload left on your free seat</span>
          <TooltipInfo>
            <ToolTipsContent />
          </TooltipInfo>
        </p>
        <FileUploaderList />
      </div>
    </div>
  );
}

const tooltipsData = [
  {
    title: 'What is a free seat?',
    description:
      'A free seat is a free account that allows you to upload 5 files for free. You can upgrade to a paid account to get more upload limits.'
  }
];

const ToolTipsContent = () => {
  return (
    <div className="flex flex-col space-y-4 min-w-[200px] max-w-min">
      {tooltipsData.map((toolTip, index) => (
        <div key={index} className="space-y-2">
          <p className="text-lg font-semibold">{toolTip.title}</p>
          <p className="text-sm font-light">{toolTip.description}</p>
        </div>
      ))}
    </div>
  );
};
