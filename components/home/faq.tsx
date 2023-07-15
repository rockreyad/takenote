'use client';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'Why use TakeNote AI?',
    answer: `For Organisations:  TakeNote can record and transcribe meetings, with an accuracy that is higher than most people can achieve.  Our software can comprehend very high talking rates and strong regional accents.  Support for multiple languages will be added in H1-23.   Meeting transcripts can be summarised, analyzed and visualized.

    Improve productivity for employees. Enhance meeting effectiveness.  Increase accuracy.
    For Teams: TakeNote AI enhances meeting productivity by reducing the burden on attendees to take notes in real-time.   This enables meeting delegates to concentrate on the meeting itself and to contribute more.
    
    The Summary and Visualisation features identifies key points from the dialogue such as consensus, actions & decisions.
    For the individual:  TakeNote AI enables staff to focus more on meeting content and contribute more.  Individuals who were unable to attend the meeting are able to review transcriptions and summaries to enhance productivity.
    
    Never miss important meeting content, even if you are unable to attend in person.`
  },
  {
    question: 'How does it all work?',
    answer: `TakeNote AI is a general-purpose speech recognition model,  trained on a very large dataset of diverse audio that can perform accurate speech recognition, transcription, translation, summarisation, visualisation and language identification.

    TakeNote AI uses Convolution Neural Networks to comprehend transcribed text and deliver accurate summaries and perform sentiment analysis.
    
    Meeting transcriptions can be visualised using 'Knowledge Graphing' with Natural Language Processing.   This extracts semantic relationships between identified entities.  This is performed using REBEL - Relational Extraction by End-to-End Language generation.`
  },
  {
    question: 'Which languages does TakeNote AI support?',
    answer:
      'TakeNote AI currently supports English only.  Support for 10 other languages will be released in H1-2023.'
  }
  // More questions...
];

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
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
