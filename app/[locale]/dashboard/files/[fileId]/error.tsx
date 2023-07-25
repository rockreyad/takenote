'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="space-y-4 text-center min-h-screen flex flex-col items-center justify-center">
      <p>Somethings want wrong. Please try to refresh this page.</p>
      <Button
        className="bg-primary hover:bg-primary/80"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
