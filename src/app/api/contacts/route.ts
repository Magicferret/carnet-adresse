import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany()
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des contacts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, avatarSlug, avatarColor, favorite } = body

    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json({ error: "Tous les champs doivent être remplis" }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { firstName, lastName, email, phone, avatarSlug, avatarColor, favorite },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création du contact" }, { status: 500 })
  }
}
