import { BuildingOffice2Icon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ContactInfo() {
  return (
    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
      <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 ring-1 ring-gray-900/10 dark:ring-white/5 lg:w-1/2">
          <svg className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true" >
            <defs>
              <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width={200} height={200} x="100%" y={-1} patternUnits="userSpaceOnUse" >
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="white" />
            <svg x="100%" y={-1} className="overflow-visible fill-gray-50 dark:fill-gray-800/20" >
              <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} className="dark:fill-gray-900" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
          </svg>
          <div className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]" aria-hidden="true" >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#8093ff] to-[#46e586] opacity-20"
              style={{ clipPath: 'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)' }} />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"> Get in touch </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          “Or you can contact us through the information below”
        </p>
        <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
          <div className="flex gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Address</span>
              <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>
              7 Bell Yard, London
              <br />
              WC2A 2JR
            </dd>
          </div>
          <div className="flex gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Email</span>
              <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
            </dt>
            <dd>
              <a className="hover:text-gray-900 dark:hover:text-white" href="mailto:contact@takenote.ai" >contact@takenote.ai</a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
