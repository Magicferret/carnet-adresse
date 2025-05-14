// src/pages/api/contacts/[id].ts
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string)

    if (req.method === 'GET') {
        const contact = await prisma.contact.findUnique({ where: { id } })
        if (!contact) return res.status(404).json({ message: 'Contact not found' })
            return res.status(200).json(contact)
    }

    if (req.method === 'PUT') {
        const { firstName, lastName, email, phone, avatarSlug, avatarColor, favorite } = req.body
        if (!firstName || !lastName || !email || !phone)
            return res.status(400).json({error: 'Champ requis manquants'});
        const contact = await prisma.contact.update({
            where: { id },
            data: { firstName, lastName, email, phone, avatarSlug, avatarColor, favorite },
        })
        return res.status(200).json(contact)
    }

    if (req.method === 'DELETE') {
        try {

            await prisma.contact.delete({ where: { id } })
            return res.status(204).end()
        } catch (err) {
            void err;
            return res.status(500).json({ error: 'Erreur lors de la suppression' })
        }
    }

    return res.status(405).json({ message: 'Method not allowed' })
}
