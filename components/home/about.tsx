'use client';
import React from 'react';
import animationData2 from '../../public/lottie/77488-translate-language.json';
import animationData1 from '../../public/lottie/signin.json';
import animationData3 from '../../public/lottie/7491-uploading-files.json';
import animationData4 from '../../public/lottie/97208-network.json';
import Lottie from 'react-lottie';

function About() {
  const option1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option3 = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const option4 = {
    loop: true,
    autoplay: true,
    animationData: animationData4,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <div id="about" className="py-12">
        <div className="relative ml-auto">
          <h2 className="font-display text-3xl tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl flex justify-center">
            About Us
          </h2>
          <p></p>
        </div>
        <div className=" mt-4 px-12">
          <div className="grid grid-cols-12 py-5 ">
            <div className="lg:col-span-4 xl:col-span-4 2xl:col-span-4 col-span-12 md:col-span-4">
              <div>
                <h3 className="font-medium text-3xl leading-10 text-gray-500">
                  <span className="text-black dark:text-white">TakeNote</span> –
                  AI powered to enhance meeting productivity with accurate
                  transcription, summaries and visualisations.
                </h3>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-8 2xl:col-span-8 col-span-12 md:col-span-8    ">
              <div className="grid grid-cols-12">
                <div className="col-span-6 flex flex-col py-4 items-center transition-transform hover:scale-105 hover:duration-700">
                  <Lottie options={option1} height={150} width={150} />
                  <p className="font-lg text-base leading-7 text-center">
                    Training model of more than 440,000 hours
                  </p>
                </div>
                <div className="col-span-6 flex flex-col py-4 items-center transition-transform hover:scale-105 hover:duration-700">
                  <Lottie options={option2} height={150} width={150} />
                  <p className="font-lg text-base leading-7 text-center">
                    Support for multiple languages
                  </p>
                </div>
                <div className="col-span-6 flex flex-col py-4 items-center transition-transform hover:scale-105 hover:duration-700">
                  <Lottie options={option3} height={150} width={150} />
                  <p className="font-lg text-base leading-7 text-center">
                    Cloud based for immediate deployment
                  </p>
                </div>
                <div className="col-span-6 flex flex-col py-4 items-center transition-transform hover:scale-105 hover:duration-700">
                  <Lottie options={option4} height={150} width={150} />
                  <p className="font-lg text-base leading-7 text-center">
                    540+ million words transcribed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
