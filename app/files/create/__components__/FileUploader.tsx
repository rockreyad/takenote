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
    <div
      style={{
        WebkitBoxShadow: '10px 10px 20px 5px rgba(0,0,0,.12)',
        MozBoxShadow: '10px 10px 20px 5px rgba(0,0,0,.12)',
        boxShadow: '10px 10px 20px 5px rgba(0,0,0,.12)'
      }}
      className="bg-white dark:bg-secondary p-4 rounded-2xl"
    >
      <div
        className={cn(
          'p-4 flex flex-col justify-between space-y-10 min-w-[250px] max-w-[fit-content]',
          {
            'border-2 border-dashed border-gray-200 dark:border-gray-700':
              variant === 'outline'
          }
        )}
      >
        <div className="flex flex-col space-y-4 min-h-[132px]">
          <Icon className="w-8 h-8 text-primary" />
          <Label className="text-lg  font-light text-black dark:text-white text-opacity-40">
            {label}
          </Label>
        </div>
        {type === 'upload' && (
          <Button
            className="flex mx-auto items-center justify-center bg-primary py-4 rounded-sm text-white dark:text-black uppercase tracking-widest cursor-pointer transition-all w-full"
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
