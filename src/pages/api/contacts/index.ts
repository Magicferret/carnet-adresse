// src/pages/api/contacts/index.ts
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const contacts = await prisma.contact.findMany()
		return res.status(200).json(contacts)
	}

	if (req.method === 'POST') {
		const { firstName, lastName, email, phone, avatarSlug, avatarColor, favorite } = req.body
		if (!firstName || !lastName || !phone || !email)
			return res.status(400).json({ error: 'Tous les champs doivent être remplis'});

		const contact = await prisma.contact.create({
			data: { firstName, lastName, email, phone, avatarSlug, avatarColor, favorite },
		})
		return res.status(201).json(contact)
	}

	return res.status(405).json({ message: 'Method not allowed' })
}
