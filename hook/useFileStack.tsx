import { filestack, filestackClient } from '@/lib/filestack';
import { useToast } from '@/components/ui/use-toast';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { storeSingleFile } from '@/server/api/files';
import { File_Status } from '@/types/file';
import { useSession } from 'next-auth/react';

const options = {
  uploadConfig: {},
  fromSources: [
    'local_file_system',
    'instagram',
    'facebook',
    'googledrive',
    'dropbox'
  ],
  accept: ['video/*', 'audio/*'],
  maxFiles: 1,
  maxSize: 1024 * 1024 * 250,
  onFileSelected: (file) => {
    // If you throw any error in this function it will reject the file selection.
    // The error message will be displayed to the user as an alert.
    if (file.size > 1024 * 1024 * 250) {
      throw new Error('File too big, select something smaller than 1MB');
    }
  },
  failOverMaxFiles: false
} as filestack.PickerOptions;

const useFileStack = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  // File picker modal
  const OpenFilePicker = useCallback(async () => {
    const FileUploaed = await filestackClient
      .picker({
        ...options,
        onFileUploadFailed: () => {
          toast({
            title: 'File upload failed',
            description: 'Your file has failed to upload to the cloud'
          });
        },
        onFileUploadFinished: async (file) => {
          await storeSingleFile({
            name: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            container: file.container as string,
            handle: file.handle,
            status: File_Status.IN_PROGRESS,
            key: file.key as string,
            userId: session?.user?.id as string
          });
          toast({
            title: 'File upload success',
            description: 'Your file has been uploaded to the cloud'
          });
          router.push(`/dashboard/files/random?fileName=${file.key}`);
        },
        onFileUploadStarted: () => {
          toast({
            title: 'File upload started',
            description: 'Your file is being uploaded to the cloud'
          });
        },
        onFileUploadCancel: () => {
          toast({
            title: 'File upload cancelled',
            description: 'Your file has been cancelled'
          });
        }
      })
      .open();
    return FileUploaed;
  }, [toast]);

  return { OpenFilePicker };
};

export default useFileStack;
