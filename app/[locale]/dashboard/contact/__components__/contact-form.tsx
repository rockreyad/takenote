'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export default function ContactForm() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      // Perform renaming logic here
      const res = await axios.post('/api/user_contact', {
        email: session!.user!.email,
        message: message
      });
      console.log(res);

      toast({
        title: res.data.status === 200 ? 'Send contact successfully' : 'Send contact failed',
        description: res.data.message
      });
    } catch (error) {
      toast({
        title: 'Send contact failed',
        description: 'Occurred Exception',
        color: '#EF4444',
        about: error as string
      });
    }
  };

  return (
    <form action="#" method="POST" className="px-6 pt-10 lg:px-8">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white " >
              Full name
            </label>
            {session?.user?.name as string}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white " >
              Email
            </label>
            {session?.user?.email as string}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white " >
              Message
            </label>
            <div className="mt-2.5">
              <textarea name="message" onChange={(e) => setMessage(e.target.value)} id="message" rows={4} required value={message} className="block w-full rounded-md dark:bg-white/5 border-0 px-3.5 py-2 text-gray-900  dark:text-white  shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary/40 dark:focus:ring-primary/10 sm:text-sm sm:leading-6" defaultValue={''} />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button onClick={handleSubmit} className="flex-none rounded-md bg-primary dark:bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-50 dark:text-gray-900 shadow-sm hover:bg-gray-900 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" >
            Send message
          </button>
        </div>
      </div>
    </form>
  );
}
