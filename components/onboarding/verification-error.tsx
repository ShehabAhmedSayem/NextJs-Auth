'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { useStepperContext } from '@/hooks/use-stepper-context';

const VerificationError = ({
  setHasVerificationError
}: {
  setHasVerificationError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handlePreviousStep } = useStepperContext();
  return (
    <div>
      <div className="m-auto flex h-[500px] max-w-2xl flex-col items-center justify-center gap-4">
        <Image
          width={200}
          height={200}
          src="/images/verification-error.svg"
          alt="verification error image"
        />
        <div className="text-center text-neutral-900">
          <h1 className="text-3xl font-semibold">Verification Unsuccessful</h1>
          <p className="mt-4 text-xl font-light">
            We couldn&apos;t verify your identity at this time. Please double-check the information
            you provided and ensure that it matches the details associated with your account.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={() => setHasVerificationError(false)} type="submit" className=" min-w-52">
          Verify again
        </Button>
        <Button onClick={handlePreviousStep} type="submit" className="ml-4" variant="outline">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default VerificationError;
