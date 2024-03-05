import React from 'react';
import { cn } from '@/lib/utils';

type CustomTextWrapperProps = {
  className?: string;
  children: string;
};

const CustomTextWrapper = ({ className, children }: CustomTextWrapperProps) => (
  <span className={cn('text-sm font-medium text-indigo-700', className)}>{children}</span>
);

export { CustomTextWrapper };
