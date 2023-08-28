import ContactForm from './__components__/contact-form';
import ContactInfo from './__components__/contact-info';

export default function Privacy() {
  return (
    <div className="space-y-2">
      <div className="space-y-10">
        <div className="mt-6 space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">You can send any question information to customer support team.</h2>
          <p className="text-sm text-muted-foreground">FAQ, process, AI, etc..</p>
        </div>
        <div id="contact" className="relative isolate bg-white dark:bg-gray-900">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
