import { PrimaryProduct } from '@/components/home/primary-product';
import Hero from '@/components/home/hero';
import LogoCloud from '@/components/home/logo-cloud';
import NewsLetter from '@/components/home/newsletter';
import { FunctionComponent } from 'react';
import Features from '@/components/home/features';
import FAQ from '@/components/home/faq';
import Contact from '@/components/home/contact';
import Footer from '@/components/home/footer';
import ScrollToTop from '@/components/home/ScrollToTop';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Hero />
      <LogoCloud />
      <PrimaryProduct />
      <Features />
      <FAQ />
      <Contact />
      <NewsLetter />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
