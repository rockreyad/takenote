'use client';
import Image from 'next/image';
import Navbar from './navbar';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '@/lib/gsapUtils';

gsap.registerPlugin(ScrollTrigger);

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Hero() {
  const main = useRef<any>(null);
  const tl = useRef<string>(null);
  const ctx = useGsapContext(main);
  useIsomorphicLayoutEffect(() => {
    ctx.add(() => {
      // tl.current = gsap.timeline();
      gsap
        .timeline()
        .from('.hero-text h1', { opacity: 0, ease: 'power2.in' })
        .from('.hero-text p', {
          opacity: 0,
          y: 10,
          delay: -0.2,
          ease: 'power2.in'
        })
        .from('.hero-text div', {
          opacity: 0,
          y: 10,
          delay: -0.2,
          ease: 'power2.in'
        })
        .from('.hero-img', {
          opacity: 0,
          y: 150,
          scale: 1.5,
          duration: 1.5,
          ease: 'sine'
        })
        .fromTo(
          '.hero-img',
          { scale: 1 },
          {
            scale: 1.2,
            // x: -500,
            y: 200,
            // keyframes: {
            //   x: [0, -500, 200, 0],
            //   y: [0, 200, 200, 0],
            //   scale: [1, 1.5, 1.5, 1],
            //   easeEach: 'sine'
            // },
            ease: 'sine',
            duration: 500,
            // attr: {
            //   src: '/images/app-screenshot-2.png'
            // },
            scrollTrigger: {
              trigger: '.hero-img',
              start: 'start 30%',
              end: 'top top',
              scrub: true,
              // markers: true,
              pin: main.current
            }
          }
        );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!main.current) return;
      const { clientX, clientY } = ev;
      main.current.style.setProperty('--x', `${clientX}px`);
      main.current.style.setProperty('--y', `${clientY}px`);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return (
    <div
      className="bg-white overflow-hidden relative before:pointer-events-none before:fixed before:inset-0 before:z-50 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--primary)_0%,_transparent_100%)] before:opacity-40"
      ref={main}
    >
      <Navbar />
      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Text */}
            <div className="hero-text mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                THE NEXT GENERATION
              </h1>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                SPEECH TO TEXT AI
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Transform your business by changing the way you process audio
                and video into documents. Trust our cutting-edge speech to text
                AI to boost your productivity.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register for free
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            {/* Image */}
            <div className="hero-img mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/images/app-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
