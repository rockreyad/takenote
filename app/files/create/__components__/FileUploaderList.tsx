'use client';

import React from 'react';
import { FileUploader } from './FileUploader';
import { UploadIcon } from '@radix-ui/react-icons';
import { GrLink } from 'react-icons/gr';
import * as filestack from 'filestack-js';

const filestackClient = filestack.init(
  process.env.NEXT_PUBLIC_FILESTACK_API_KEY || ''
);

export default function FileUploaderList() {
  return (
    <>
      <div
        className="flex flex-col md:flex-row items-center gap-5 max-h-max pb-96"
        onDragOver={() => filestackClient.picker().open()}
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
                ? () => filestackClient.picker().open()
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
    Icon: UploadIcon,
    variant: 'outline'
  },
  {
    type: 'link',
    label: 'Share a link to public web address',
    buttonName: 'paste a url',
    Icon: GrLink,
    variant: 'solid'
  }
];
