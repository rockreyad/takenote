import * as filestack from 'filestack-js';
const filestackClient = filestack.init(
  process.env.NEXT_PUBLIC_FILESTACK_API_KEY || ''
);

const options = {
  uploadConfig: {},
  fromSources: [
    'local_file_system',
    'instagram',
    'facebook',
    'googledrive',
    'dropbox',
    'webcam'
  ],
  accept: ['audio/*', 'video/*'],
  maxFiles: 1,
  maxSize: 1024 * 1024 * 5,
  failOverMaxFiles: false,
  onFileUploadFinished: (res: any) => {
    console.log(res);
  },
  onUploadDone: (res: any) => {
    console.log(res);
  }
};

const FileStackUploader = async () => {
  const FileUploaed = await filestackClient.picker(options).open();
  return FileUploaed;
};
export default FileStackUploader;
