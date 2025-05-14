import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilitaire de fusion de classes CSS qui combine clsx et tailwind-merge
 * Permet de fusionner des classes Tailwind de manière intelligente en évitant les conflits
 * @param inputs - Les classes CSS à fusionner
 * @returns Une chaîne de caractères contenant les classes CSS fusionnées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Interface définissant la structure d'un contact dans l'application
 * @property id - Identifiant unique du contact
 * @property firstName - Prénom du contact
 * @property lastName - Nom de famille du contact
 * @property email - Adresse email du contact
 * @property phone - Numéro de téléphone du contact
 * @property avatarSlug - Identifiant de l'avatar du contact (peut être null si pas d'avatar)
 */
export interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  avatarSlug: string | null
}
