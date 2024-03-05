'use client';

import React from 'react';
import StepItem from './step-item';
import { RightChevronIcon } from '@/icons';
import { STEPS } from '@/lib/constants';
import { useStepperContext } from '@/hooks/use-stepper-context';

const StepTracker = () => {
  const { completedSteps, currentStep } = useStepperContext();

  return (
    <div>
      <div className="flex w-full items-center gap-2">
        {STEPS.map(({ id, ...rest }) => {
          const isCompleted = completedSteps.includes(id);
          const state = isCompleted ? 'complete' : 'disabled';
          return (
            <React.Fragment key={id}>
              <StepItem step={id} state={state} active={id === currentStep} {...rest} />
              {id !== STEPS.length && (
                <div>
                  <RightChevronIcon className="text-2xl text-neutral-400" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepTracker;
