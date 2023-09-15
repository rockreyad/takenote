'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import Container from '@/components/container';
import screenshotExpenses from '@/images/screenshots/Summarise.png';
import screenshotPayroll from '@/images/screenshots/Transcribe.png';
import screenshotReporting from '@/images/screenshots/Identify.png';
import screenshotVatReturns from '@/images/screenshots/Analyse.png';
import { useGsapContext, useIsomorphicLayoutEffect } from '@/lib/gsapUtils';
import { Power2, gsap } from 'gsap';

const product = [
  {
    title: 'Transcribe',
    description:
      'Transform meetings into accurate transcriptions with exceptional accuracy. Our advanced AI solution approaches human level robustness and accuracy on English speech recognition.',
    image: screenshotPayroll
  },
  {
    title: 'Summarise',
    description:
      'Generate accurate meeting summaries. TakeNote AI engine comprehends meeting context and content to achieve high precision.',
    image: screenshotExpenses
  },
  {
    title: 'Analyse',
    description:
      'Sentiment Analysis using Natural Language Processing models.Generate accurate insight. Make better decisions.',
    image: screenshotVatReturns
  },
  // {
  //   title: 'Visualise',
  //   description: `Extract semantic relationships between entities from transcribed text using Natural Language Processing.
  //     TakeNote generates visualisations of transcriptions and displays connections.`,
  //   image: screenshotVatReturns
  // },
  {
    title: 'Identify',
    description:
      'Identify speakers from AI analysis of voices.Simply upload sample audio clips of each speaker and let TakeNote AI do the rest.',
    image: screenshotReporting
  }
  // {
  //   title: 'Focus',
  //   description:
  //     'TakeNote AI will take meeting notes for you.Focus on the discussion - never miss an important action, decision or debate.',
  //   image: screenshotReporting
  // },
  // {
  //   title: 'Stay informed',
  //   description:
  //     'Can’t attend a meeting?  Send TakeNote AI.Review the transcript or summary offline.',
  //   image: screenshotReporting
  // }
];

export function PrimaryProduct() {
  const [tabIndex, setTabIndex] = useState(0);
  let [tabOrientation, setTabOrientation] = useState('horizontal');

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)');

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal');
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener('change', onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, []);
  const productRef = useRef<any>(null);
  const ctx = useGsapContext(productRef);
  useIsomorphicLayoutEffect(() => {
    ctx.add(() => {
      gsap.from('.product-title', {
        opacity: 0,
        y: -40,
        duration: 2,
        ease: Power2.easeOut,
        scrollTrigger: {
          trigger: '.product-title',
          start: '40px bottom',
          toggleActions: 'restart none none reverse'
        }
      });
      gsap.from('.product-subtitle', {
        opacity: 0,
        y: 10,
        duration: 2,
        ease: Power2.easeOut,
        scrollTrigger: {
          trigger: '.product-subtitle',
          toggleActions: 'restart none none reverse'
        }
      });
      gsap.from('.tab-panel', {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: Power2.easeOut,
        scrollTrigger: {
          trigger: '.tab-panel',
          start: '10% bottom',
          toggleActions: 'restart none none reverse'
        }
      });
      // Timeline
      const myObj = { value: 0 };
      gsap
        .timeline()
        .to(productRef.current, {
          keyframes: {
            scale: [0.8, 1],
            easeEach: Power2.easeOut
          },
          scrollTrigger: {
            trigger: productRef.current,
            start: 'top bottom',
            end: '20% 80%',
            // markers: true,
            scrub: 3
          }
        })
        .to(myObj, {
          value: product.length - 1,
          snap: 'value',
          duration: 4,
          scrollTrigger: {
            trigger: productRef.current,
            pin: true,
            start: '10% top',
            end: 'bottom top',
            scrub: true,
            // markers: true,
            onUpdate: () => {
              // console.log(myObj.value);
              setTabIndex(myObj.value);
            }
          }
        })
        .to(productRef.current, {
          keyframes: {
            scale: [1, 0.9],
            easeEach: Power2.easeOut
          },
          scrollTrigger: {
            trigger: productRef.current,
            start: 'bottom 20%',
            end: 'bottom top',
            // markers: true,
            scrub: 3
          }
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={productRef}
      id="product"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-green-600 dark:bg-gray-900 pb-28 pt-20 sm:py-32 mt-32 sm:mt-48"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        // src={backgroundImage}
        src={''}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="product-title font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            TakeNote
          </h2>
          <p className="product-subtitle mt-6 text-lg tracking-tight text-green-100">
            AI power to enhance meeting productivity with accurate
            transcription, summaries and visualisations.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
          selectedIndex={tabIndex}
          onChange={setTabIndex}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {product.map((product, productIndex) => (
                    <div
                      key={product.title}
                      className={clsx(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === productIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg focus:outline-none',
                            selectedIndex === productIndex
                              ? 'text-green-600 lg:text-white'
                              : 'text-green-100 hover:text-white lg:text-white'
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {product.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === productIndex
                            ? 'text-white'
                            : 'text-green-100 group-hover:text-white'
                        )}
                      >
                        {product.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="tab-panels lg:col-span-7">
                {product.map((product) => (
                  <Tab.Panel className="tab-panel" key={product.title}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-green-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        className="w-full"
                        src={product.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
