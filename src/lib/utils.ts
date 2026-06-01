import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYear(year?: number) {
  return year ?? new Date().getFullYear();
}

export function splitChars(text: string) {
  return text.split("");
}
