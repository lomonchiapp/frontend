import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAfterThirdSpace(text: string): string {
  const thirdSpaceIndex = text.split('').reduce((acc, char, i) => {
    if (char === ' ') acc.count++;
    if (acc.count === 3 && acc.index === -1) acc.index = i;
    return acc;
  }, { count: 0, index: -1 }).index;

  if (thirdSpaceIndex !== -1 && thirdSpaceIndex < text.length - 1) {
    return text.substring(0, thirdSpaceIndex) + '...';
  }
  
  return text;
}
