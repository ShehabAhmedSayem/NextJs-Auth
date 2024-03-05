'use client';

import React, { useEffect, useState } from 'react';
import BootcampCard from './bootcamp-card';
import { Button } from '../ui/button';
import { ArrowRightThinIcon, LinkStrokeIcon } from '@/icons';
import { useStepperContext } from '@/hooks/use-stepper-context';
import { BOOTCAMP_INFO, BootcampInfo } from '@/lib/constants';
import { getContracts } from '@/services/api-services';
import { ContractsDataSchema } from '@/lib/validations/contracts-schema';
import { z } from 'zod';
import { Skeleton } from '../ui/skeleton';
import { calculateMinimumTotalCost, formatDate } from '@/lib/utils';

type ContractTypes = z.infer<typeof ContractsDataSchema>;

const ExperienceJobHuntBootcamp = () => {
  const { handleNextStep } = useStepperContext();
  const [loading, setLoading] = useState(true);
  const [bootcampData, setBootcampData] = useState<ContractTypes>();

  const fetchApplicantsList = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await getContracts();
      setBootcampData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantsList();
  }, []);

  return (
    <div className="rounded-2xl border border-neutral-300 bg-neutral shadow">
      <div className="p-8 text-3xl font-semibold">
        {loading ? (
          <Skeleton className="mt-2 h-10 w-96 rounded-lg bg-neutral-200" />
        ) : (
          <h1>{bootcampData?.program.title}</h1>
        )}
      </div>
      <div className="border-y border-neutral-200 p-8">
        <div className="mb-6 grid grid-cols-3 gap-6">
          {BOOTCAMP_INFO.map(({ id, icon, title, description }: BootcampInfo) => (
            <BootcampCard
              key={id}
              icon={icon}
              title={title}
              loading={loading}
              description={bootcampData?.program ? description(bootcampData?.program) : ''}
            />
          ))}
        </div>
        <Button variant="outline" className="flex gap-2">
          <LinkStrokeIcon className="text-2xl" />
          Discover all Benefits
        </Button>
      </div>
      <div className="p-8">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-neutral-600">Start date</p>
            {loading ? (
              <Skeleton className="mt-2 h-6 w-40 rounded-lg bg-neutral-200" />
            ) : (
              <p className="text-lg font-medium text-neutral-900">
                {formatDate(bootcampData?.contract.trainingStartDate)}
              </p>
            )}
          </div>
          <div>
            <p className="text-neutral-600">Total Cost</p>
            {loading ? (
              <Skeleton className="mt-2 h-6 w-40 rounded-lg bg-neutral-200" />
            ) : (
              <p className="text-lg font-medium text-neutral-900">
                {calculateMinimumTotalCost(bootcampData?.paymentMethods ?? [])}
              </p>
            )}
          </div>
          <div>
            <p className="text-neutral-600">Cost Registration</p>
            <p className="text-lg font-medium text-neutral-900">200.00 USD</p>
          </div>
        </div>
        <Button
          onClick={handleNextStep}
          type="button"
          className="mt-8 flex min-w-52 items-center justify-center gap-2 text-lg"
        >
          <p className="text-sm">Continue</p> <ArrowRightThinIcon className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default ExperienceJobHuntBootcamp;
