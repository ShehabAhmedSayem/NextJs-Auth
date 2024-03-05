'use client';

import StepComponentRenderer from '@/components/onboarding/step-component-renderer';
import StepTracker from '@/components/onboarding/step-tracker';
import { Skeleton } from '@/components/ui/skeleton';
import { StepperProvider } from '@/context/stepper-context';
import { getUser } from '@/services/api-services';
import React, { useEffect, useState } from 'react';

const OnboardingPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchApplicantsList = async () => {
    setLoading(true);
    try {
      const {
        data: { profile }
      } = await getUser();
      setUserName(profile?.firstName || '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsList();
  }, []);

  return (
    <StepperProvider>
      <div>
        <div className="border-b border-b-neutral-300 bg-neutral py-6">
          <div className="m-auto max-w-8xl">
            <div>
              {loading ? (
                <div>
                  <Skeleton className="mt-2 h-10 w-96 rounded-lg bg-neutral-200" />
                </div>
              ) : (
                <h1 className="text-5xl font-bold text-neutral-950">Welcome {userName},</h1>
              )}

              <div className="mt-2 max-w-lg text-neutral-700">
                <p>
                  Welcome to our mentorship program! Dive into &quot;
                  <span className="font-medium text-neutral-900">
                    Hands-on Experience & Job Hunt Bootcamp
                  </span>
                  &quot; for a transformative journey to your dream job.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <StepTracker />
            </div>
          </div>
        </div>
        <div className="m-auto mt-10 max-w-8xl">
          <StepComponentRenderer />
        </div>
      </div>
    </StepperProvider>
  );
};

export default OnboardingPage;
