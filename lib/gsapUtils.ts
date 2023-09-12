import { gsap } from 'gsap';
import { SlowMo } from 'gsap/all';
import { useEffect, useLayoutEffect, useMemo } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGsapContext(scope: any) {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return ctx;
}

export const scrollTo = (id: string, offsetY = 0) => {
  if (typeof window === 'undefined') return;
  gsap.to(window, {
    ease: SlowMo.ease.config(0.5, 0.7, false),
    scrollTo: {
      y: id,
      offsetY
    }
  });
};
