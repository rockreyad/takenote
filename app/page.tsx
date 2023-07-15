import Hero from '@/components/home/hero';
import LogoCloud from '@/components/home/logo-cloud';
import { FunctionComponent } from 'react';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Hero />
      <LogoCloud />
    </>
  );
};

export default Home;
