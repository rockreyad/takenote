import { PrimaryFeatures } from '@/components/home/PrimaryFeatures';
import Contact from '@/components/home/contact';
import FAQ from '@/components/home/faq';
import Features from '@/components/home/features';
import Footer from '@/components/home/footer';
import Hero from '@/components/home/hero';
import LogoCloud from '@/components/home/logo-cloud';
import NewsLetter from '@/components/home/newsletter';
import { FunctionComponent } from 'react';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Hero />
      <LogoCloud />
      <PrimaryFeatures />
      <Features />
      <FAQ />
      <Contact />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
