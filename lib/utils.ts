import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SIDENAV_ITEMS, SideNavItem } from "./constants";
import { PaymentMethod } from "./validations/contracts-schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function filterNavigationItemsByRole(userRole: string): SideNavItem[] {
  return SIDENAV_ITEMS.filter(item => {
    return !item.roles || item.roles.includes(userRole);
  });
}



const roles = {
  student: [
    '/',
    '/dashboard',
    '/onboarding',
  ],
  admin: [
    '/',
    '/dashboard',
  ]
}

export function isPathPermissible(userRole: string, requestedPath: string): boolean {
  const rolePaths = roles[userRole as keyof typeof roles];

  if (!rolePaths) {
    return false; // User role not defined, path is not permissible
  }

  const permissiblePaths = rolePaths.map(path => {
    if (path.includes('*')) {
      return new RegExp(`^${path.replace(/\*/g, '.*')}`);
    } else {
      return path;
    }
  });

  return permissiblePaths.some(path => {
    if (typeof path === 'string') {
      return path === requestedPath;
    } else {
      return path.test(requestedPath);
    }
  });
}





export const formatDate = (timestampInSeconds?: number, useShortYear?: boolean): string => {
  const date = new Date(timestampInSeconds ? Number(timestampInSeconds) * 1000 : '');
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  if (useShortYear) {
    const shortYear = String(date.getFullYear()).slice(2);
    return `${month} ${day}, ${shortYear}`;
  }

  return `${day} ${month}, ${year}`;
};

export function formatDateShortYear(timestampInSeconds?: number): string {
  return formatDate(timestampInSeconds, true);
}


export function calculateMinimumTotalCost(paymentMethods: PaymentMethod[]) {
  const totalCosts = paymentMethods?.map(method => {
    const ricCost = method.ricAmount * method.ricNumOfInstallments;
    const cppCost = method.cppAmount * method.cppNumOfInstallments;
    return ricCost + cppCost;
  });

  const minTotalCost = Math.min(...totalCosts);

  return minTotalCost;
}

export const getURL = (path: string = '') => {

  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
      process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      :
      'http://localhost:3000/';


  url = url.replace(/\/+$/, '');
  url = url.includes('http') ? url : `https://${url}`;
  path = path.replace(/^\/+/, '');

  return path ? `${url}/${path}` : url;
};
