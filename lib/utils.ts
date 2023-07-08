import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { taskSchema } from '@/app/files/__data__/schema';
import { faker } from '@faker-js/faker';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateFakeTabledata = (length: number) => {
  const tasks = [];
  for (let i = 0; i < length; i++) {
    const fakeTask = {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['in progress', 'done', 'canceled']),
      label: faker.helpers.arrayElement([
        'Human Transcripts',
        'Auto Transcripts',
        'Human Captions',
        'Global Subtitles'
      ]),
      priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
      create_at: faker.date.past()
    };
    tasks.push(fakeTask);
  }

  return z.array(taskSchema).parse(tasks);
};
