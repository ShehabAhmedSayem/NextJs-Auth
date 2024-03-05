import ResetPasswordConfirmForm from '@/components/forms/reset-password-confirm-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const ResetPasswordConfirmPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Password</CardTitle>
        <CardDescription>Enter a new password.</CardDescription>
      </CardHeader>
      <hr className="border-t-1 mx-6 mb-8 mt-2 border-neutral-200" />
      <CardContent>
        <Suspense fallback={<Skeleton className="h-[374px] w-[240px]" />}>
          <ResetPasswordConfirmForm />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordConfirmPage;
