import { env } from '@/env.mjs';
import * as filestack from 'filestack-js';

export const filestackClient = filestack.init(
  env.NEXT_PUBLIC_FILESTACK_API_KEY as string
);

export { filestack };
