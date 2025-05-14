import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  avatarSlug: string | null
  avatarColor: string | null
  favorite: boolean
  address?: string
  notes?: string
}
