import Footer from '@/components/home/footer';
import PrivacyContent from './privacy.mdx';
import Container from '@/components/container';
import Navbar from '@/components/home/navbar';

export default function Privacy() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 overflow-hidden relative before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),#98FF24,_transparent_100%)] dark:before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),#7775D6,_transparent_100%)] before:opacity-40 dark:before:opacity-40">
        <Navbar />
        <Container className="relative isolate pt-24 prose dark:prose-invert lg:prose-xl">
          <PrivacyContent />
        </Container>
      </div>
      <Footer />
    </>
  );
}
