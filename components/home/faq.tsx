'use client';
import { Disclosure, Transition } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

type FAQProps = {
  question: string;
  answer: string[];
};

const faqs: FAQProps[] = [
  {
    question: 'Why use TakeNote AI?',
    answer: [
      '**For Organisations:** **TakeNote** can record and transcribe meetings, with an accuracy that is higher than most people can achieve.  Our software can comprehend very high talking rates and strong regional accents.  Support for multiple languages will be added in H1-23.   Meeting transcripts can be summarised, analyzed and visualized.',
      ' *Improve productivity for employees. Enhance meeting effectiveness.  Increase accuracy.*  ',
      '**For Teams:** **TakeNote AI** enhances meeting productivity by reducing the burden on attendees to take notes in real-time.   This enables meeting delegates to concentrate on the meeting itself and to contribute more. ',
      '*The Summary and Visualisation features identifies key points from the dialogue such as consensus, actions & decisions.*  ',
      '**For the individual:  TakeNote AI** enables staff to focus more on meeting content and contribute more.  Individuals who were unable to attend the meeting are able to review transcriptions and summaries to enhance productivity.  ',
      '*Never miss important meeting content, even if you are unable to attend in person.*'
    ]
  },
  {
    question: 'How does it all work?',
    answer: [
      '**TakeNote AI** is a general-purpose speech recognition model,  trained on a very large dataset of diverse audio that can perform accurate speech recognition, transcription, translation, summarisation, visualisation and language identification.',

      '**TakeNote AI** uses Convolution Neural Networks to comprehend transcribed text and deliver accurate summaries and perform sentiment analysis.',

      "Meeting transcriptions can be visualised using 'Knowledge Graphing' with Natural Language Processing.   This extracts semantic relationships between identified entities.  This is performed using REBEL - Relational Extraction by End-to-End Language generation."
    ]
  },
  {
    question: 'Which languages does TakeNote AI support?',
    answer: [
      '**TakeNote AI** currently supports English only.  Support for 10 other languages will be released in H1-2024.'
    ]
  },
  {
    question: 'How secure is my information? ',
    answer: [
      'All of your data is encrypted during transit and storage.  We use HTTPS, TLS 1.2 and SHA256 encryption technology - the highest level of security available.   Additionally, we do not store your credit card information.',
      'All our transcriptions are performed by our AI engine hosted on the Cloud.  No people based transcription is ever performed, ensuring your files are managed securely.'
    ]
  },
  {
    question: 'How accurate is TakeNote AI?',
    answer: [
      '**TakeNote AI** is highly accurate.  It is trained on a very large dataset of diverse audio that can perform accurate speech recognition, transcription, translation, summarisation, visualisation and language identification.',
      'Our software can comprehend very high talking rates and strong regional accents.'
    ]
  },
  {
    question: 'How long does transcription take?',
    answer: [
      'This depends on the length of the audio file that you send to us.  A 1 hour audio file will typically be transcribed in around 10 minutes and we will email you once its complete.'
    ]
  },
  {
    question: 'How do I get started?',
    answer: [
      'Simply sign up and start using TakeNote AI today.  No credit card is required.  You don&apos;t need to download any software.  You can **start using TakeNote AI immediately**.'
    ]
  },
  {
    question: 'How much does it cost?',
    answer: [
      'TakeNote AI is free to use for the first trail events.  When it&apos;s over, we will launch our paid product. After that, you can choose from one of our affordable plans.  You can cancel at any time.'
    ]
  }
  // More questions...
];

export default function FAQ() {
  return (
    <div id="faq" className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-0  lg:px-8">
        <div className="mx-auto divide-y divide-gray-900/10 dark:divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                          {faq.answer.map((answer, faqIndex) => (
                            <ReactMarkdown
                              key={faqIndex}
                              className="mt-4 text-gray-500 dark:text-gray-400"
                            >
                              {answer}
                            </ReactMarkdown>
                          ))}
                        </p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
