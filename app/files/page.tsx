import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { z } from 'zod';

import { FunctionComponent } from 'react';
import { DataTable } from './__components__/data-table';
import { taskSchema } from './__data__/schema';
import { columns } from './__components__/columns';

interface MyFilesProps {}

export const metadata: Metadata = {
  title: 'My Files',
  description: 'A list of files that I have uploaded.'
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/files/__data__/tasks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const MyFiles: FunctionComponent<MyFilesProps> = async () => {
  const tasks = await getTasks();
  return (
    <>
      <div className="space-y-8">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          My Files
        </h1>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
};

export default MyFiles;
