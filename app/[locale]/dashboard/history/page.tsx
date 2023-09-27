import { Metadata } from 'next';
import { FunctionComponent } from 'react';
import { DataTable } from './__components__/data-table';
import { columns } from './__components__/columns';
import { FolderOpenIcon } from 'lucide-react';
import PrimaryButton from './__components__/PrimaryButton';
import { getHistory, getHistoryByUserId } from '@/server/api/files';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { USER_ROLE } from '@/server/zodSchema/user';

export const metadata: Metadata = {
  title: 'Order History - TakeNote',
  description: 'A history of all my orders'
};

const MyFilesPage: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);
  let files;
  if (session?.user.role === USER_ROLE.enum.ADMIN) {
    files = await getHistory();
  } else {
    files = await getHistoryByUserId(session?.user.id || '');
  }
  const tableFiles = files?.map((file) => {
    return {
      id: file.id,
      title: file.name,
      key: file.key,
      status: file.status,
      create_at: file.createdAt,
      handle: file.handle
    };
  });
  return (
    <>
      <div className="space-y-8 h-screen">
        <div className="scroll-m-20 border-b pb-2 first:mt-0 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold  transition-colors flex items-center gap-2">
            <FolderOpenIcon className="w-6 h-6 text-primary" />
            <span>Order History</span>
          </h1>
          <PrimaryButton buttonName="place new order" />
        </div>
        <div className="w-full">
          {tableFiles && <DataTable columns={columns} data={tableFiles} />}
        </div>
      </div>
    </>
  );
};

export default MyFilesPage;
