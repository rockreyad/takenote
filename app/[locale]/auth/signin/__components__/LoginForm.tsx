'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import TextField from './TextField';
import ProviderButton from './ProviderButton';
import { RiGoogleFill } from 'react-icons/ri';
import SubmitButton from './SubmitButton';

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: '', password: '' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl
      });

      setLoading(false);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <TextField
          required
          id="email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
        />
      </div>
      <div className="mb-6">
        <TextField
          required
          id="password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <SubmitButton type="submit" label="Sign in" loading={loading} />
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>
      <ProviderButton
        backgroundColor="#3b5998"
        label="Continue with Google"
        icon={<RiGoogleFill className="w-full h-full" />}
        onClick={() => signIn('google', { callbackUrl })}
      />
      {/* <ProviderButton
        backgroundColor="#55acee"
        label=" Continue with GitHub"
        icon={<RiGithubFill className="w-full h-full" />}
        onClick={() => signIn('github', { callbackUrl })}
      /> */}
    </form>
  );
};
