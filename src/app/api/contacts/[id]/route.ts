/**
 * API Routes pour la gestion d'un contact spécifique.
 * Fournit les endpoints GET, PUT et DELETE pour manipuler un contact par son ID.
 */
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

type RouteParams = {
  params: {
    id: string
  }
}

/**
 * GET /api/contacts/[id]
 * Récupère un contact spécifique par son ID.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: paramId } = await Promise.resolve(params)
    const id = parseInt(paramId)
    const contact = await prisma.contact.findUnique({
      where: { id },
    })

    if (!contact) {
      return NextResponse.json({ message: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération du contact" }, { status: 500 })
  }
}

/**
 * PUT /api/contacts/[id]
 * Met à jour un contact existant.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: paramId } = await Promise.resolve(params)
    const id = parseInt(paramId)
    const body = await request.json()
    const { firstName, lastName, email, phone, avatarSlug } = body

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { firstName, lastName, email, phone, avatarSlug },
    })

    return NextResponse.json(contact)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour du contact" }, { status: 500 })
  }
}

/**
 * DELETE /api/contacts/[id]
 * Supprime un contact par son ID.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: paramId } = await Promise.resolve(params)
    const id = parseInt(paramId)
    await prisma.contact.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression du contact" }, { status: 500 })
  }
}
