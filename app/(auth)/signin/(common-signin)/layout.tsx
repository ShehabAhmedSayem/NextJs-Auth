'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextWrapper } from '@/components/ui/custom-text-wrapper';
import { GoogleIcon } from '@/icons';
import { createClient } from '@/lib/supabase/client';
import { getURL } from '@/lib/utils';

import React from 'react';

const CommonSignInLayout = ({ children }: React.PropsWithChildren) => {
  const loginWithGoogle = async () => {
    const supabase = createClient();
    const redirectURL = getURL('/auth/callback');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectURL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to Algorizin</CardTitle>
        <CardDescription>
          Do not have an account?{' '}
          <span className="cursor-pointer hover:underline">
            <CustomTextWrapper>Start here</CustomTextWrapper>
          </span>
        </CardDescription>
      </CardHeader>
      <hr className="border-t-1 mx-6 mb-8 mt-2 border-neutral-200" />
      <CardContent className="mt-6 pb-4">{children}</CardContent>
      <hr className="border-t-1 mx-6 mb-4 border-neutral-200" />
      <div className="mb-6 grid">
        <Button onClick={loginWithGoogle} variant="outline" className="mx-6 flex gap-2 font-normal">
          <GoogleIcon className="text-2xl" />
          Continue with Google
        </Button>
      </div>
    </Card>
  );
};

export default CommonSignInLayout;
