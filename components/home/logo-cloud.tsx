'use client';
import Transistor from './__company-logo__/transistor';
import Reform from './__company-logo__/reform';
import Tuple from './__company-logo__/tuple';
import SavvyCal from './__company-logo__/savvycal';
import Satamic from './__company-logo__/satatmic';
import { useGsapContext, useIsomorphicLayoutEffect } from '@/lib/gsapUtils';
import { useRef } from 'react';
import { gsap } from 'gsap';

export default function LogoCloud() {
  const logoCloudRef = useRef<any>(null);
  const ctx = useGsapContext(logoCloudRef);
  useIsomorphicLayoutEffect(() => {
    ctx.add(() => {
      gsap.from('.cloud-logo', {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        scrollTrigger: {
          trigger: logoCloudRef.current,
          start: '80px bottom',
          toggleActions: 'restart none none reverse'
        }
      });
    });
    return () => ctx.revert();
  });
  return (
    <div className="relative isolate z-10 mt-32 sm:mt-48" ref={logoCloudRef}>
      <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)] dark:[mask-image:radial-gradient(50%_45%_at_50%_55%,black,transparent)] bg-white dark:bg-black">
        <svg
          className="h-[40rem] w-[80rem] flex-none stroke-gray-200 dark:stroke-gray-700"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
              width={200}
              height={200}
              x="50%"
              y="50%"
              patternUnits="userSpaceOnUse"
              patternTransform="translate(-100 0)"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y="50%"
            className="overflow-visible fill-gray-50 dark:fill-gray-950"
          >
            <path
              d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-gray-50">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2 max-h-12 object-contain lg:col-span-1 h-[158px] w-[48px]">
            <Transistor className="cloud-logo fill-gray-900 dark:fill-gray-100" />
          </div>
          <div className="col-span-2 max-h-12 w-full object-contain lg:col-span-1">
            <Reform className="cloud-logo fill-gray-900 dark:fill-gray-100" />
          </div>
          <div className="col-span-2 max-h-12 w-full object-contain lg:col-span-1">
            <Tuple className="cloud-logo fill-gray-900 dark:fill-gray-100" />
          </div>

          <div className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1">
            <SavvyCal className="cloud-logo fill-gray-900 dark:fill-gray-100" />
          </div>

          <div className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1">
            <Satamic className="cloud-logo fill-gray-900 dark:fill-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
