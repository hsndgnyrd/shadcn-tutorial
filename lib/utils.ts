import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null

  const item = localStorage.getItem(key)
  if (item) return JSON.parse(item) as T;
  return null
}

export const removeItem = (key: string): void => {
  localStorage.removeItem(key)
}

export const clear = (): void => {
  localStorage.clear()
}