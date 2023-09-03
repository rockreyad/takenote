'use client';
import { cn } from '@/lib/utils';
// import {
//   AcademicCapIcon,
//   BanknotesIcon,
//   CheckBadgeIcon,
//   ClockIcon,
//   ReceiptRefundIcon,
//   UsersIcon
// } from '@heroicons/react/24/outline';
import Container from '../container';
import animationData5 from '../animation/28784-businessmen-at-the-table.json';
import animationData6 from '../animation/67986-business-deal.json';
import animationData7 from '../animation/76888-color-data-analysis.json';
import animationData10 from '../animation/84726-business-meeting-animation.json';
import animationData15 from '../animation/Comp-2.json';
import animationData17 from '../animation/Isometric-people.json';
import Lottie from 'react-lottie';

export default function Features() {
  const option1 = {
    loop: true,
    autoplay: true,
    animationData: animationData10,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option2 = {
    loop: true,
    autoplay: true,
    animationData: animationData5,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option3 = {
    loop: true,
    autoplay: true,
    animationData: animationData7,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option4 = {
    loop: true,
    autoplay: true,
    animationData: animationData15,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option5 = {
    loop: true,
    autoplay: true,
    animationData: animationData17,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option6 = {
    loop: true,
    autoplay: true,
    animationData: animationData6,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const actions = [
    {
      title: 'Accurate',
      description:
        'Our advanced artificial intelligence models provide an exceptional level of accuracy, automatically handling spelling and punctuation. When compared to humans, our AI models approach their accuracy and robustness.',
      href: '#',
      icon: option1,
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50'
    },
    {
      title: 'Versatile',
      description:
        'TakeNote AI is available with its full functionality on popular browsers, such as Google Chrome and Edge. All processing is performed securely on the Cloud.',
      href: '#',
      icon: option2,
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50'
    },
    {
      title: 'Secure',
      description:
        'TakeNote provides high level security, privacy and data protection.',
      href: '#',
      icon: option3,
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50'
    },
    {
      title: 'Speaker separation',
      description:
        'TakeNote can recognise and identify multiple speakers in the same audio file and label them accurately.',
      href: '#',
      icon: option4,
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50'
    },
    {
      title: 'Robust',
      description:
        'Handle poor quality audio, strong regional accents, very fast speech and noisy backgrounds whilst producing precise output.',
      href: '#',
      icon: option5,
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50'
    },
    {
      title: 'Automatic punctuation',
      description:
        'TakeNote accurately punctuates transcriptions with commas, question marks and full stops.',
      href: '#',
      icon: option6,
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50'
    }
  ];
  return (
    <Container className="py-12">
      <div
        id="features"
        className="max-w-2xl md:mx-auto md:text-center xl:max-w-none"
      >
        <h2 className="font-display text-3xl tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl">
          Features
        </h2>
        <p className="mt-6 text-lg tracking-tight text-gray-400 dark:text-green-100">
          Transcribe audio into insight with exceptional accuracy.
        </p>
      </div>

      <div className="mt-16 divide-y divide-gray-200 dark:divide-white/20 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-200/20 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={cn(
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'group relative bg-white dark:bg-gray-900 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500'
            )}
          >
            <div>
              <span
                className={cn(
                  action.iconBackground,
                  action.iconForeground,
                  'inline-flex rounded-lg p-3 ring-4 ring-white'
                )}
              >
                {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
                <Lottie options={action.icon} height={150} width={150} />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
