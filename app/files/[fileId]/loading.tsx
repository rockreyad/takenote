import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <>
      <div className="fixed z-50 inset-0 flex flex-col gap-2 items-center justify-center bg-white lg:left-52">
        <div className="animate-spin">
          <Loader2 />
        </div>
        <p className="animate-pulse">loading..</p>
      </div>
    </>
  );
}
