'use client';

import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useDashboardLayout } from '@/context/DashboardLayout';
import { UserNav } from '@/components/dashboard/user-nav';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const { setSidebarOpen } = useDashboardLayout();
  const router = useRouter();
  const pathname = usePathname()

  const [ searchValue, setSearchValue ] = useState('')

  return (
    <>
      <div className="sticky top-0 z-40 bg-background text-foreground flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form className="relative flex flex-1 my-2" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute inset-y-0 left-1 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-400 bg-transparent placeholder:text-gray-400 focus:ring-1 focus:ring-primary sm:text-sm focus:outline-none rounded-lg"
              placeholder="Search..."
              value={searchValue}
              type="search"
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchValue !== '') {
                  if (pathname === '/dashboard') {
                    router.push(`dashboard/files/?query=${searchValue}`);
                  } else {
                    router.push(`files/?query=${searchValue}`);
                  }
                  setSearchValue('')
                }
              }}
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            {/* Profile dropdown */}
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
