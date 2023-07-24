import { Separator } from '@/components/ui/separator';
import { Play } from 'lucide-react';

export default function TabSpeakerDiarisation() {
  return (
    <>
      <div className="space-y-8">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Diarisation
        </h2>
        <div>
          <div className="leading-8 flex items-center gap-4">
            <p className="font-semibold text-primary">Speaker 1</p>
            <Separator orientation="vertical" className="bg-gray-400 h-4" />
            <span className="flex items-center gap-2 cursor-pointer">
              <Play className="h-4 w-4 text-black" />
              00:11
            </span>
          </div>
          <blockquote className="mt-6 border-l-2 border-primary pl-6 italic">
            `&quot;After all,`&quot; he said, `&quot;everyone enjoys a good
            joke, so it&apos;s only fair that they should pay for the privilege.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur,
            fugiat distinctio! Optio repudiandae, voluptate, aspernatur eaque
            nemo eveniet magnam numquam veritatis, quae odit sapiente autem et
            possimus obcaecati! Suscipit, error. `&quot;
          </blockquote>
        </div>
        <div>
          <div className="leading-8 flex items-center gap-4">
            <p className="font-semibold text-blue-500">Speaker 2</p>
            <Separator orientation="vertical" className="bg-gray-400 h-4" />
            <span className="flex items-center gap-2 cursor-pointer">
              <Play className="h-4 w-4 text-black" />
              00:25
            </span>
          </div>
          <blockquote className="mt-6 border-l-2 border-blue-500 pl-6 italic">
            &quot;After all,&quot; he said, &quot;everyone enjoys a good joke,
            so it&apos;s only fair that they should pay for the privilege. Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, fugiat
            distinctio! Optio repudiandae, voluptate, aspernatur eaque nemo
            eveniet magnam numquam veritatis, quae odit sapiente autem et
            possimus obcaecati! Suscipit, error. &quot;
          </blockquote>
        </div>
        <div>
          <div className="leading-8 flex items-center gap-4">
            <p className="font-semibold text-primary">Speaker 1</p>
            <Separator orientation="vertical" className="bg-gray-400 h-4" />
            <span className="flex items-center gap-2 cursor-pointer">
              <Play className="h-4 w-4 text-black" />
              00:45
            </span>
          </div>
          <blockquote className="mt-6 border-l-2 border-primary pl-6 italic">
            `&quot;After all,`&quot; he said, `&quot;everyone enjoys a good
            joke, so it&apos;s only fair that they should pay for the privilege.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur,
            fugiat distinctio! Optio repudiandae, voluptate, aspernatur eaque
            nemo eveniet magnam numquam veritatis, quae odit sapiente autem et
            possimus obcaecati! Suscipit, error. `&quot;
          </blockquote>
        </div>
        <div>
          <div className="leading-8 flex items-center gap-4">
            <p className="font-semibold text-blue-500">Speaker 2</p>
            <Separator orientation="vertical" className="bg-gray-400 h-4" />
            <span className="flex items-center gap-2 cursor-pointer">
              <Play className="h-4 w-4 text-black" />
              01:25
            </span>
          </div>
          <blockquote className="mt-6 border-l-2 border-blue-500 pl-6 italic">
            &quot;After all,&quot; he said, &quot;everyone enjoys a good joke,
            so it&apos;s only fair that they should pay for the privilege. Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, fugiat
            distinctio! Optio repudiandae, voluptate, aspernatur eaque nemo
            eveniet magnam numquam veritatis, quae odit sapiente autem et
            possimus obcaecati! Suscipit, error. &quot;
          </blockquote>
        </div>
      </div>
    </>
  );
}
