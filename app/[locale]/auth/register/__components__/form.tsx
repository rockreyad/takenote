'use client';

import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  const { toast } = useToast();
  let [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      toast({
        title: 'Account created.',
        description: 'We have created your account.',
        duration: 3000
      });

      signIn(undefined, { callbackUrl: '/' });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: 'Error',
        description: error.message,
        duration: 3000
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        rowGap: 10
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        required
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <label htmlFor="email">Email</label>
      <input
        required
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <label htmlFor="password">Password</label>
      <input
        required
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <button
        style={{
          backgroundColor: `${loading ? '#ccc' : '#3446eb'}`,
          color: '#fff',
          padding: '1rem',
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        {loading ? 'loading...' : 'Register'}
      </button>
    </form>
  );
};
