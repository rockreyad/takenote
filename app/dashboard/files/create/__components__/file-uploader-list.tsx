'use client';

import React from 'react';
import { FileUploader } from './file-uploader';
import { RiLink, RiUploadCloud2Line } from 'react-icons/ri';
import useFileStack from '@/hook/useFileStack';

export default function FileUploaderList() {
  const { OpenFilePicker } = useFileStack();
  return (
    <>
      <div
        className="flex flex-col md:flex-row items-center gap-5 max-h- w-min pb-96"
        onDragOver={OpenFilePicker}
      >
        {FilePickerOptions.map((option) => (
          <FileUploader
            key={option.type}
            type={option.type}
            Icon={option.Icon}
            label={option.label}
            buttonName={option.buttonName}
            variant={option.variant || 'solid'}
            onClick={option.type === 'upload' ? OpenFilePicker : undefined}
          />
        ))}
      </div>
    </>
  );
}

const FilePickerOptions: FileUploader[] = [
  {
    type: 'upload',
    label: 'Upload files from your computer or drag and drop',
    buttonName: 'upload files',
    Icon: RiUploadCloud2Line,
    variant: 'outline'
  },
  {
    type: 'link',
    label: 'Share a link to public web address',
    buttonName: 'paste a url',
    Icon: RiLink,
    variant: 'solid'
  }
];
