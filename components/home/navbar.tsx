'use client';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../icon/logo';
import { ThemeSelector } from './ThemeSelector';
import { scrollTo } from '@/lib/gsapUtils';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const navigation = [
  { name: 'Home', href: '#navbar' },
  { name: 'Product', href: '#product' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
];

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status } = useSession();
  return (
    <>
      <header id="navbar" className="absolute inset-x-0 top-0 z-50">
        {/* Desktop Navbar */}
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">TakeNote.ai</span>
              <Logo />
            </div>
          </div>
          <div className="flex lg:hidden gap-2">
            <ThemeSelector className="relative z-10" />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <p
                key={item.name}
                // href={item.href}
                onClick={() => scrollTo(item.href, 100)}
                className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            {/* Theme Switch Toggle */}
            <ThemeSelector className="relative z-10" />
            <a
              href={status === 'authenticated' ? '/dashboard' : '/auth/signin'}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {status === 'authenticated' ? 'Dashboard' : 'signIn'}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* Mobile Navbar layout */}

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 sm:dark:ring-white/10">
            <div className="flex items-center justify-between">
              <div
                className="-m-1.5 p-1.5 cursor-pointer"
                onClick={() => scrollTo('#navbar')}
              >
                <span className="sr-only">TakeNote.ai</span>
                <Logo variant="small" />
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <p
                      key={item.name}
                      onClick={() => {
                        scrollTo(item.href, 100);
                        setMobileMenuOpen(false);
                      }}
                      className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href={
                      status === 'authenticated' ? '/dashboard' : '/auth/signin'
                    }
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:text-gray-800"
                  >
                    {status === 'authenticated' ? 'Dashboard' : 'signIn'}
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Navbar;
