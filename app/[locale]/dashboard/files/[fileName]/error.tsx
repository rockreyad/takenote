'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  reset,
  error
}: {
  reset: () => void;
  error: Error;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
