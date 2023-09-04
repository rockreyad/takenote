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

// Function to convert seconds to HH:MM:SS format
export function formatTimeFromSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds % 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
}
