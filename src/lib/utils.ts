import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const THEME = {
  LOCALSTORAGE_KEY: '__wake-cap-tod-theme',
  DEFAULT: 'system',
} as const;
