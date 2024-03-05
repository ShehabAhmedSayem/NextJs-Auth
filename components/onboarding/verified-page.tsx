'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { useStepperContext } from '@/hooks/use-stepper-context';
import { ArrowRightThinIcon } from '@/icons';

const VerifiedPage = () => {
  const { handleNextStep, handlePreviousStep } = useStepperContext();
  return (
    <div>
      <div className="m-auto flex h-[500px] max-w-md flex-col items-center justify-center gap-4">
        <Image
          width={56}
          height={56}
          src="/images/verification-success.svg"
          alt="verification error image"
        />
        <div className="text-center text-neutral-900">
          <h1 className="text-3xl font-semibold text-green-600">Verified</h1>
          <p className="mt-4 text-xl font-light">
            We have successfully verified your identity. Please Proceed to the next step.
          </p>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <Button
          onClick={handleNextStep}
          type="button"
          disabled
          className=" flex min-w-52 items-center justify-center gap-2 text-lg"
        >
          <p className="text-sm">Proceed</p> <ArrowRightThinIcon className="text-2xl" />
        </Button>
        <Button onClick={handlePreviousStep} type="submit" variant="outline">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default VerifiedPage;
