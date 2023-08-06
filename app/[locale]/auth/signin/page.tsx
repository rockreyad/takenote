'use client';
import { useRouter } from 'next/navigation';
import { LoginForm } from './__components__/LoginForm';
import { useSession } from 'next-auth/react';
export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  if (status === 'authenticated') {
    router.push('/dashboard');
  }
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
