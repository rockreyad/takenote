/* eslint-disable @next/next/no-img-element */
'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
  FolderOpenIcon,
  ClockIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useDashboardLayout } from '@/context/dashboardLayout';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Cpu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger
// } from '@/components/ui/tooltip';
// import { InfoCircledIcon } from '@radix-ui/react-icons';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: true },
  { name: 'My files', href: '/files', icon: FolderOpenIcon, current: false },
  { name: 'History', href: '/history', icon: ClockIcon, current: false },
  { name: 'Contact', href: '/comtact', icon: EnvelopeIcon, current: false }
];

const Sidebar = () => {
  const path = usePathname();
  const { setSidebarOpen, sidebarOpen } = useDashboardLayout();
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-[250px] flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ring-1 bg-primary-foreground ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="takenote"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={cn(
                                  path === item.href
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 hover:dark:bg-gray-700',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon
                                  className={cn('h-6 w-6 shrink-0', {
                                    'text-primary': path === item.href
                                  })}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li className="mt-auto space-y-2">
                        <SidebarUpgradeContainer />
                        <SidebarSettings />
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden bg-primary-foreground px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img className="h-16 w-auto" src="/logo.png" alt="takenote" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          path === item.href
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 hover:dark:bg-gray-700',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={cn('h-6 w-6 shrink-0 text-[#949494]', {
                            'text-primary': path === item.href
                          })}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto space-y-2">
                <SidebarUpgradeContainer />
                <SidebarSettings />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

const SidebarSettings = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <p className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 hover:dark:bg-gray-700 cursor-pointer">
            <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
            Settings
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Moon className="mr-2 h-4 w-4" />
              <span>Theme mode</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme === 'dark'}
                  onCheckedChange={() => setTheme('dark')}
                >
                  <span>Dark</span>
                  <DropdownMenuShortcut>
                    <Moon className="mr-2 h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === 'light'}
                  onCheckedChange={() => setTheme('light')}
                >
                  <span>Light</span>
                  <DropdownMenuShortcut>
                    <Sun className="mr-2 h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === 'system'}
                  onCheckedChange={() => setTheme('system')}
                >
                  <span>System</span>
                  <DropdownMenuShortcut>
                    <Cpu className="mr-2 h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const SidebarUpgradeContainer = () => {
  return (
    <div className="p-3 bg-white rounded-lg drop-shadow space-y-4 text-xs font-semibold text-center">
      <p className="">5 videos remaining on your {plans[0].name} plan</p>
      <Separator />
      <Button
        className="bg-primary w-full space-x-1 capitalize rounded-lg"
        size={'sm'}
      >
        <span className="">{plans[0].cta}</span>
        {/* <TooltipInfo info={plans[0].toolTipInfo!} /> */}
      </Button>
    </div>
  );
};

const plans = [
  {
    name: 'Starter',
    price: 0,
    features: [],
    cta: 'upgrade',
    toolTipInfo: 'upgrade for unlimited transcriptions'
  },
  {
    name: 'Pro',
    price: 10,
    features: [],
    cta: 'Upgrade'
  }
];

// const TooltipInfo = (props: { info: string }) => {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <InfoCircledIcon className="" />
//         </TooltipTrigger>
//         <TooltipContent className="z-50">
//           <p>{props.info}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

export default Sidebar;
