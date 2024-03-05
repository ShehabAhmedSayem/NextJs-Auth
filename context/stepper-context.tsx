import { STEPS } from '@/lib/constants';
import { createContext, useState } from 'react';

type StepperContextType = {
  currentStep: number;
  completedSteps: number[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  moveToStep: (step: number) => void;
};

export const StepperContext = createContext<StepperContextType>({} as StepperContextType);

type StepperProviderProps = {
  children: React.ReactNode;
};

export const StepperProvider = ({ children }: StepperProviderProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const moveToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        completedSteps,
        handleNextStep,
        handlePreviousStep,
        moveToStep
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
