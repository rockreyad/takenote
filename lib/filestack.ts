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
    'dropbox'
  ],
  accept: ['.mp3', 'video/*'],
  maxFiles: 1,
  maxSize: 1024 * 1024 * 250,
  failOverMaxFiles: false,
  onFileUploadFinished: (res: filestack.PickerFileMetadata) => {
    // console.log('File Stack On file upload finished', res);
  },
  onUploadDone: (res: filestack.PickerResponse) => {
    // console.log('File Stack On Upload Done', res);
  }
} as filestack.PickerOptions;

const FileStackUploader = async () => {
  const FileUploaed = await filestackClient.picker(options).open();
  return FileUploaed;
};
export default FileStackUploader;
