import { Loader2 } from 'lucide-react';

const FullPageLoading = () => {
  return (
    <div className="fixed z-50 inset-0 flex flex-col gap-2 items-center justify-center bg-white dark:bg-gray-800 lg:left-52 text-gray-900 dark:text-white">
      <div className="animate-spin">
        <Loader2 />
      </div>
      <p className="animate-pulse">Please wait.Do not close this Browser</p>
    </div>
  );
};

export default FullPageLoading;
