import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useMemo } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGsapContext(scope: any) {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return ctx;
}
