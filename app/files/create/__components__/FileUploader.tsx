'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import FileUploaderURLDialog from './FileUploaderURL';

export interface FileUploader {
  type?: 'upload' | 'link';
  Icon: any;
  label: string;
  buttonName: string;
  variant?: 'solid' | 'outline';
  onClick?: () => void;
}

export const FileUploader = ({
  type,
  Icon,
  label,
  buttonName,
  variant = 'solid',
  onClick
}: FileUploader) => {
  return (
    <div className="bg-white p-4 rounded-sm drop-shadow-lg w-fit">
      <div
        className={cn('max-w-[280px] p-4 space-y-10', {
          'border-2 border-dashed border-gray-200': variant === 'outline'
        })}
      >
        <div className="flex flex-col space-y-4">
          <Icon className="w-8 h-8 text-primary" />
          <Label className="text-lg  font-light text-black text-opacity-40">
            {label}
          </Label>
        </div>
        {type === 'upload' && (
          <Button
            className="flex mx-auto items-center justify-center bg-primary py-4 rounded-sm text-white uppercase tracking-widest cursor-pointer transition-all w-full"
            onClick={onClick || (() => {})}
          >
            {buttonName}
          </Button>
        )}
        {type === 'link' && <FileUploaderURLDialog buttonName={buttonName} />}
      </div>
    </div>
  );
};
