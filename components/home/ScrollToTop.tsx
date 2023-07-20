'use client';
import { scrollTo } from '@/lib/gsapUtils';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  return (
    <>
      <div className="fixed right-8 bottom-8 z-50">
        <button
          onClick={() => scrollTo('#navbar')}
          className="w-10 h-10 bg-green-500 dark:bg-white rounded-full flex justify-center items-center"
        >
          <ArrowUp className="w-5 h-5 text-white dark:text-gray-900" />
        </button>
      </div>
    </>
  );
};

export default ScrollToTop;
