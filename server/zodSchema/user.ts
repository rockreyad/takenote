import { z } from 'zod';

const userRole = ['USER', 'ADMIN'] as const;
export const USER_ROLE = z.enum(userRole);
