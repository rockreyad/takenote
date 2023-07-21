'use client';
import { gsap } from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
import { createContext } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const GsapContext = createContext(null);
GsapContext.displayName = 'GsapContext';

const GsapProvider = (props: { children: React.ReactNode }) => {
  return <GsapContext.Provider value={null} {...props} />;
};
export default GsapProvider;
