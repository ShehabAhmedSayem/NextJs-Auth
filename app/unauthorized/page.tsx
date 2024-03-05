'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="m-auto mt-36 flex max-w-2xl flex-col justify-center">
      <div className="m-auto flex  flex-col items-center justify-center">
        <Image
          width={300}
          height={175}
          src="/images/unauthorized.svg"
          alt="unauthorized error image"
        />
        <div className="mt-16 text-center text-neutral-900">
          <h1 className="text-3xl font-semibold">No authorization found.</h1>
          <p className="mt-4 text-xl font-light">
            Access to this page is restricted. It appears you do not have the necessary
            authorization to view its contents. To proceed, please log in to your account to gain
            access to this page&apos;s resources.
          </p>
        </div>
      </div>
      <div className="m-auto mt-16 w-max">
        <Link href="/signin">
          <Button type="button" className="mr-4" variant="outline">
            Login
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button type="button" className="min-w-52">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
