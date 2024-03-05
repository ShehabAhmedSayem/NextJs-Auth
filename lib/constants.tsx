import ExperienceJobHuntBootcamp from '@/components/onboarding/experience-job-hunt-bootcamp';
import IdentityVerification from '@/components/onboarding/identity-verification';
import {
  CalenderIcon,
  CardAddIcon,
  ChatIcon,
  ClipBoardIcon,
  ClockIcon,
  DashboardIcon,
  DashboardIcon2,
  EditPencilIcon,
  JobIcon,
  PaymentIcon,
  PeopleGroupIcon,
  PeopleGroupIcon2,
  QrScanIcon,
  ReceiptTextIcon,
  SettingIcon,
  SparkleIcon,
  StepsIcon
} from '@/icons';
import { z } from 'zod';
import { ProgramSchema } from './validations/contracts-schema';

export type SideNavItem = {
  title: string;
  path: string;
  icon: JSX.Element;
  roles?: string[];
};
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon className="text-2xl" />,
    roles: ['student']
  },
  {
    title: 'Payments',
    path: '/payments',
    icon: <PaymentIcon className="text-2xl" />,
    roles: ['student']
  },
  {
    title: 'Employment',
    path: '/employment',
    icon: <JobIcon className="text-2xl" />,
    roles: ['student']
  },
  {
    title: 'Terms',
    path: '/terms',
    icon: <ClipBoardIcon className="text-2xl" />,
    roles: ['student']
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <SettingIcon className="text-2xl" />,
    roles: ['student']
  },
  {
    title: 'Students',
    path: '/dashboard',
    icon: <PeopleGroupIcon className="text-2xl" />,
    roles: ['admin']
  }
];

interface Step {
  id: number;
  title: string;
  icon: JSX.Element;
  component: React.ReactNode;
}

export const STEPS: Step[] = [
  {
    id: 1,
    title: 'Welcome',
    icon: <SparkleIcon />,
    component: <ExperienceJobHuntBootcamp />
  },
  {
    id: 2,
    title: 'Verification',
    icon: <QrScanIcon />,
    component: <IdentityVerification />
  },
  {
    id: 3,
    title: 'Financial Plan',
    icon: <ReceiptTextIcon />,
    component: <ExperienceJobHuntBootcamp />
  },
  {
    id: 4,
    title: 'Sign Contract',
    icon: <EditPencilIcon />,
    component: <ExperienceJobHuntBootcamp />
  },
  {
    id: 5,
    title: 'Payment',
    icon: <CardAddIcon />,
    component: <ExperienceJobHuntBootcamp />
  }
];

type ProgramInfo = z.infer<typeof ProgramSchema>;

export interface BootcampInfo {
  id: number;
  icon: JSX.Element;
  title: string;
  description: (program: ProgramInfo) => string;
}

export const BOOTCAMP_INFO: BootcampInfo[] = [
  {
    id: 1,
    icon: <ClockIcon />,
    title: 'Program Duration',
    description: (program) =>
      `${program.trainingDurationInMonths} months training + ${program.jobHuntSupportDurationInMonths} months job support`
  },
  {
    id: 2,
    icon: <DashboardIcon2 />,
    title: 'Model',
    description: (program) => program.model
  },
  {
    id: 3,
    icon: <PeopleGroupIcon2 />,
    title: 'Mentor Style',
    description: (program) => program.mentorStyle
  },
  {
    id: 4,
    icon: <StepsIcon />,
    title: 'Commitment',
    description: (program) => program.commitment
  },
  {
    id: 5,
    icon: <CalenderIcon />,
    title: 'Course Format',
    description: (program) => program.courseFormat
  },
  {
    id: 6,
    icon: <ChatIcon />,
    title: 'Support',
    description: (program) => program.support
  }
];

export type UserProfileStatus = {
  [key: string]: {
    badgeTitle: string;
    colorVariant: 'outline' | 'warning' | 'success';
  };
};

export const USER_PROFILE_STATUS: UserProfileStatus = {
  applied: {
    badgeTitle: 'Applied',
    colorVariant: 'outline'
  },
  approved_for_offer: {
    badgeTitle: 'Approved',
    colorVariant: 'warning'
  },

  acceptence_letter_sent: {
    badgeTitle: 'Invited',
    colorVariant: 'success'
  },
  signed_offer: {
    badgeTitle: 'Signed offer',
    colorVariant: 'success'
  }
};
