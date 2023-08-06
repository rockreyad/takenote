import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function IndexPage() {
  const session = getServerSession(authOptions);
  if (!session) redirect('/auth/signin');
  return (
    <div className="space-y-2 h-screen">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-5xl">
        THE NEXT GENERATION SPEECH TO TEXT AI
      </h1>
      <p>
        Transform your business by changing the way you process audio and video
        into documents. Trust our cutting-edge speech to text AI to boost your
        productivity.
      </p>
    </div>
  );
}
