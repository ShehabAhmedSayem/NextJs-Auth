import ResetPasswordForm from '@/components/forms/reset-password-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ResetPasswordPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>We’ll send a password reset link to this email.</CardDescription>
      </CardHeader>
      <hr className="border-t-1 mx-6 mb-8 mt-2 border-neutral-200" />
      <CardContent className="mt-6">
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
