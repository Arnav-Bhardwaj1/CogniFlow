import { LoginForm } from '@/features/auth/components/login-form'
import { requireUnauth } from '@/lib/auth-utils'
import Link from 'next/dist/client/link';
import Image from 'next/image';
import React from 'react'

const Page = async () => {
  await requireUnauth(); // Redirect to home if user is already authenticated
  return (
    <div>
        <LoginForm />
    </div>
  );
};
export default Page
