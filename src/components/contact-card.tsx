/**
 * Composant de carte de contact.
 * Affiche les informations d'un contact avec son avatar et les actions possibles.
 */
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Contact } from "@/lib/utils"
import { Edit, Mail, Phone, Trash2 } from "lucide-react"

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (id: string | number) => void
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        {/* En-tête de la carte avec avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
            {contact.avatarSlug ? (
              // Affichage de l'avatar personnalisé
              <div className="w-full h-full rounded-full relative">
                <div
                  className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"
                />
                <img
                  src={`/avatars/${contact.avatarSlug}.svg`}
                  alt={`${contact.firstName} ${contact.lastName}`}
                  className="absolute inset-0 w-full h-full object-contain p-2"
                />
              </div>
            ) : (
              // Fallback : initiales si pas d'avatar
              <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-2xl font-bold">
                {contact.firstName[0]}{contact.lastName[0]}
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold capitalize">{`${contact.firstName} ${contact.lastName}`}</h3>
        </div>

        {/* Informations de contact */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <a href={`mailto:${contact.email}`} className="text-sm hover:underline truncate">
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
              {contact.phone}
            </a>
          </div>
        </div>
      </CardContent>

      {/* Actions sur le contact */}
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(contact)}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(contact.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
