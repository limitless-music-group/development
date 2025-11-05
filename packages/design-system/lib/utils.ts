import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { parseError } from '@packages/observability/error';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

export function capitalizeFirstLetter(string: string): string { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function checkIsActive(
  currentPathname: string,
  linkHref: string
): boolean {
  return currentPathname === linkHref
}

export const handleError = (error: unknown): void => {
  const message = parseError(error);
  toast.error(message);
}

export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";
