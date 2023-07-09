import { Metadata } from 'next';

import { FunctionComponent } from 'react';
import { DataTable } from './__components__/data-table';
import { columns } from './__components__/columns';
import { generateFakeTabledata } from '@/lib/utils';
import { FolderOpenIcon } from 'lucide-react';

interface MyFilesProps {}

export const metadata: Metadata = {
  title: 'My Files',
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
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-bold  transition-colors first:mt-0 flex items-center gap-2">
          <FolderOpenIcon className="w-6 h-6 text-primary" />
          <span>My Files</span>
        </h1>
        <div className="w-full">
          <DataTable data={tasks} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default MyFiles;
