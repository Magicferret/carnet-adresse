/**
 * API Routes pour la gestion des contacts.
 * Fournit les endpoints GET pour récupérer tous les contacts
 * et POST pour créer un nouveau contact.
 */
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/contacts
 * Récupère tous les contacts de la base de données.
 * @returns {Promise<NextResponse>} Liste des contacts ou erreur 500
 */
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany()
    return NextResponse.json(contacts)
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération des contacts" }, { status: 500 })
  }
}

/**
 * POST /api/contacts
 * Crée un nouveau contact dans la base de données.
 * @param {NextRequest} request - Requête contenant les données du contact
 * @returns {Promise<NextResponse>} Contact créé ou erreur 400/500
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, avatarSlug} = body

    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json({ error: "Tous les champs doivent être remplis" }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { firstName, lastName, email, phone, avatarSlug},
    })

    return NextResponse.json(contact, { status: 201 })
  } catch {
        return NextResponse.json({ error: "Erreur lors de la création du contact" }, { status: 500 })
  }
}
