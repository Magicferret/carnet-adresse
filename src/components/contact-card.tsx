"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Contact } from "@/lib/utils"
import { Edit, Mail, Phone, Trash2 } from "lucide-react"

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
            {/* <Image
              src={contact.avatar || "/placeholder.svg"}
              alt={`${contact.firstName} ${contact.lastName}`}
              fill
              className="object-cover"
            /> */}
          </div>
          <h3 className="text-xl font-semibold">{`${contact.firstName} ${contact.lastName}`}</h3>
        </div>

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
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{contact.address}</p>
          {contact.notes && <p className="text-sm italic mt-2 line-clamp-2">{contact.notes}</p>}
        </div>
      </CardContent>
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
