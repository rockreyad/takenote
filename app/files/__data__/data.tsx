import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons';
import { BotIcon, Globe2, User2 } from 'lucide-react';

export const labels = [
  {
    value: 'Human Transcripts',
    label: 'Human Transcripts',
    icon: User2
  },
  {
    value: 'Auto Transcripts',
    label: 'Auto Transcripts',
    icon: BotIcon
  },
  {
    value: 'Human Captions',
    label: 'Human Captions',
    icon: User2
  },
  {
    value: 'Global Subtitles',
    label: 'Global Subtitles',
    icon: Globe2
  }
];

export const statuses = [
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon
  }
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon
  }
];
