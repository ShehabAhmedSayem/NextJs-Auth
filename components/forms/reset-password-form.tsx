'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkEmailSchema } from '@/lib/validations/auth';

import { createClient } from '@/lib/supabase/client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { getURL } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Inputs = z.infer<typeof checkEmailSchema>;

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(data: Inputs) {
    setLoading(true);
    try {
      const { email } = data;
      const supabase = createClient();
      const redirectURL = getURL('/signin/reset-password/confirm');
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectURL
      });
      if (!error) {
        toast({
          title: 'Please check your inbox.',
          description: 'An email has been sent to reset your password.',
          variant: 'success'
        });
      }
    } finally {
      setLoading(false);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Send'
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
