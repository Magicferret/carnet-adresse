/**
 * API Routes pour la gestion d'un contact spécifique.
 * Fournit les endpoints GET, PUT et DELETE pour manipuler un contact par son ID.
 */
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

/**
 * GET /api/contacts/[id]
 * Récupère un contact spécifique par son ID.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const contactId = parseInt(id)
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    })

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch {
    return NextResponse.json({ error: "Erreur lors de la récupération du contact" }, { status: 500 })
  }
}

/**
 * PUT /api/contacts/[id]
 * Met à jour un contact existant.
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const contactId = parseInt(id)
    const body = await request.json()
    const { firstName, lastName, email, phone, avatarSlug } = body

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: { firstName, lastName, email, phone, avatarSlug },
    })

    return NextResponse.json(contact)
  } catch {
    return NextResponse.json({ error: "Erreur lors de la mise à jour du contact" }, { status: 500 })
  }
}

/**
 * DELETE /api/contacts/[id]
 * Supprime un contact par son ID.
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const contactId = parseInt(id)
    await prisma.contact.delete({
      where: { id: contactId },
    })

    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: "Erreur lors de la suppression du contact" }, { status: 500 })
  }
}
