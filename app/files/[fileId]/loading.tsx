import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <>
      <div className="fixed z-50 inset-0 flex items-center justify-center">
        <div className="animate-spin">
          <Loader2 />
        </div>
        <p>Loading...</p>
      </div>
    </>
  );
}
