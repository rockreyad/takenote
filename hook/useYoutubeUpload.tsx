import { useToast } from '@/components/ui/use-toast';
import { File_Status } from '@/server/zodSchema/file';
import axios from 'axios';
import { uniqueId } from 'filestack-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'completed';

const useYoutubeUpload = () => {
  const [uploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const { toast } = useToast();
  const router = useRouter();

  const upload = async (link: string) => {
    setUploadStatus('uploading');
    try {
      const { data: apiFileInfo, status: apiFileInfoStatus } = await axios.post(
        'https://capturia.io/api/v1/download/video',
        {
          link,
          task: uniqueId(20)
        }
      );
      //if upload success
      if (apiFileInfoStatus === 200) {
        const { bucket, mimetype, filename, size, key, handle } = apiFileInfo;

        //send file response to server
        const { status: fileUploadStatus } = await axios.post('/api/file', {
          name: filename,
          size: size,
          mimetype: mimetype,
          container: bucket,
          handle: key,
          status: File_Status.enum.IN_PROGRESS,
          key: handle
        });
        if (fileUploadStatus === 200) {
          toast({
            title: 'File upload success',
            description: 'Your file has been uploaded to the cloud'
          });
          setUploadStatus('completed');
          router.push('/dashboard/files');
          router.refresh();
        }
      }
    } catch (error) {
      //   console.error('Error uploading file:', error);
      toast({
        title: 'File upload failed',
        description: 'Your file has failed to upload to the cloud'
      });
    }
  };

  return {
    uploadProgress,
    uploadStatus,
    upload
  };
};

export default useYoutubeUpload;
