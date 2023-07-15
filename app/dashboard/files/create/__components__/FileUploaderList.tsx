'use client';

import React from 'react';
import { FileUploader } from './FileUploader';
import { RiLink, RiUploadCloud2Line } from 'react-icons/ri';
import FileStackUploader from '@/lib/filestack';

export default function FileUploaderList() {
  return (
    <>
      <div
        className="flex flex-col md:flex-row items-center gap-5 max-h- w-min pb-96"
        onDragOver={() => FileStackUploader().then((res) => console.log(res))}
      >
        {FilePickerOptions.map((option) => (
          <FileUploader
            key={option.type}
            type={option.type}
            Icon={option.Icon}
            label={option.label}
            buttonName={option.buttonName}
            variant={option.variant || 'solid'}
            onClick={
              option.type === 'upload'
                ? () =>
                    FileStackUploader().then((res) => {
                      console.log(res);
                    })
                : undefined
            }
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
