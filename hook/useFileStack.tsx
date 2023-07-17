import { filestack, filestackClient } from '@/lib/filestack';
import { useToast } from '@/components/ui/use-toast';
import { useCallback } from 'react';

const options = {
  uploadConfig: {},
  fromSources: [
    'local_file_system',
    'instagram',
    'facebook',
    'googledrive',
    'dropbox'
  ],
  accept: ['.mp3', 'video/*'],
  maxFiles: 1,
  maxSize: 1024 * 1024 * 250,
  failOverMaxFiles: false
} as filestack.PickerOptions;

const useFileStack = () => {
  const { toast } = useToast();
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
        onFileUploadFinished: () => {
          toast({
            title: 'File upload success',
            description: 'Your file has been uploaded to the cloud'
          });
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
