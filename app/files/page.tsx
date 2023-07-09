import { Metadata } from 'next';

import { FunctionComponent } from 'react';
import { DataTable } from './__components__/data-table';
import { columns } from './__components__/columns';
import { generateFakeTabledata } from '@/lib/utils';
import { FolderOpenIcon } from 'lucide-react';
import PrimaryButton from './__components__/PrimaryButton';

interface MyFilesProps {}

export const metadata: Metadata = {
  title: 'My Files - TakeNote',
  description: 'A list of files that I have uploaded.'
};

// Simulate a database read for tasks.
async function getTasks() {
  return generateFakeTabledata(1000);
}

const MyFiles: FunctionComponent<MyFilesProps> = async () => {
  const tasks = await getTasks();
  return (
    <>
      <div className="space-y-8">
        <div className="scroll-m-20 border-b pb-2 first:mt-0 flex justify-between items-center">
          <h1 className="text-3xl font-bold  transition-colors flex items-center gap-2">
            <FolderOpenIcon className="w-6 h-6 text-primary" />
            <span>My Files</span>
          </h1>
          <PrimaryButton buttonName="place new order" />
        </div>
        <div className="w-full">
          <DataTable data={tasks} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default MyFiles;
