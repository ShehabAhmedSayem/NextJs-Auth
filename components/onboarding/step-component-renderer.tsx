import { useStepperContext } from '@/hooks/use-stepper-context';
import { STEPS } from '@/lib/constants';

const StepComponentRenderer = () => {
  const { currentStep } = useStepperContext();

  const step = STEPS.find(({ id }) => id === currentStep);

  return <div>{step?.component}</div>;
};

export default StepComponentRenderer;
