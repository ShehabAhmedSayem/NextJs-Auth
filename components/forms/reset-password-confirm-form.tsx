'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPasswordSchema } from '@/lib/validations/auth';

import { createClient } from '@/lib/supabase/client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type Inputs = z.infer<typeof resetPasswordSchema>;

const ResetPasswordConfirmForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');

  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  async function onSubmit(passwordData: Inputs) {
    const { password } = passwordData;

    const supabase = createClient();
    const { data } = await supabase.auth.updateUser({ password });
    if (data) {
      router.push('/');
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-enter new password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!code}>
          Save
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordConfirmForm;
