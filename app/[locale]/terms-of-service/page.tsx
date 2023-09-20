import Footer from '@/components/home/footer';
import PrivacyContent from './terms.mdx';
import Container from '@/components/container';
import Navbar from '@/components/home/navbar';

export default function Privacy() {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 overflow-hidden relative before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),#98FF24,_transparent_100%)] dark:before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),#7775D6,_transparent_100%)] before:opacity-40 dark:before:opacity-40">
        <Navbar />
        <Container className="relative isolate pt-24 prose dark:prose-invert lg:prose-xl md:px-6 lg:px-12">
          <h2 className="text-center my-3 md:my-10">Terms of Service</h2>
          <h6 className="font-bold text-white">Data collected</h6>

          <p className="text-sm mb-5">
            
            <ol>
              <li>
                If you continue to browse and use this website, you are agreeing to
              comply with and be bound by the following terms and conditions of
              use, which together with our privacy policy govern TakeNotes's
              relationship with you in relation to this website. If you disagree
              with any part of these terms and conditions, please do not use our
              website.
              </li>
              <li>
              className="text-sm mb-5">
              The term 'TakeNote' or 'us' or 'we' refers to the owner of the
              website. The term 'you' refers to the user or viewer of our website.
              The use of this website is subject to the following terms of use:
              </li>
              <li>
                The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
              </li>
              <li>
                This website uses cookies to monitor browsing preferences. If you do
              allow cookies to be used, the following personal information may be
              stored by us for use by third parties.
              </li>
              <li>
              Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors and we
              expressly exclude liability for any such inaccuracies or errors to
              the fullest extent permitted by law.
              </li>
              <li>
                Your use of any information or materials on this website is entirely
              at your own risk, for which we shall not be liable. It shall be your
              own responsibility to ensure that any products, services or
              information available through this website meet your specific
              requirements.
              </li>
              <li>This website contains material which is owned by or licensed to us.
              This material includes, but is not limited to, the design, layout,
              look, appearance and graphics. Reproduction is prohibited other than
              in accordance with the copyright notice, which forms part of these
              terms and conditions.</li>
              <li>All trade marks reproduced in this website which are not the
              property of, or licensed to, the operator are acknowledged on the
              website. Unauthorised use of this website may give rise to a claim
              for damages and/or be a criminal offence.</li>
              <li>From time to time this website may also include links to other
              websites. These links are provided for your convenience to provide
              further information. They do not signify that we endorse the
              website(s). We have no responsibility for the content of the linked
              website(s).</li>
              <li>Your use of this website and any dispute arising out of such use of
              the website is subject to the laws of England, Northern Ireland,
              Scotland and Wales.</li>
            </ol>

          </p>
        </Container>
      </div>
      <Footer />
    </>
  );
}
