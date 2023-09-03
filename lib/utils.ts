import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateYouTubeUrl(url: string) {
  // Regular expression pattern for YouTube URLs
  const regex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]+$/;

  return regex.test(url);
}
