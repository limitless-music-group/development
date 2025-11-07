import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

export function capitalizeFirstLetter(string: string): string { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}
