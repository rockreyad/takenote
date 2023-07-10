import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function TooltipInfo(props: {
  info?: string;
  children?: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoCircledIcon className="" />
        </TooltipTrigger>
        <TooltipContent className="z-50">
          {props.info && <p>{props.info}</p>}
          {props.children && <div>{props.children}</div>}
          {!(props.info || props.children) && <p>Tooltips content</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
