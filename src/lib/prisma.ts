/**
 * Configuration et initialisation du client Prisma pour l'accès à la base de données
 * Ce fichier implémente le pattern Singleton pour éviter la création de multiples
 * instances du client Prisma, particulièrement important en développement avec le
 * hot-reloading de Next.js
 */

import { PrismaClient } from '../generated/prisma/client'

// Étend l'objet global pour y stocker l'instance de PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient }

/**
 * Instance unique du client Prisma
 * Réutilise l'instance existante si elle existe, sinon en crée une nouvelle
 * avec la journalisation des requêtes activée
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Active la journalisation des requêtes SQL
  })

// En développement, stocke l'instance dans l'objet global pour la réutiliser
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
