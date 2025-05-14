/**
 * Formulaire de création/modification de contact.
 * Gère la saisie des informations et la sélection d'avatar.
 */
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Contact } from "@/lib/utils"
import { X } from "lucide-react"
import { useState } from "react"
import { AvatarSelector } from "./avatar-selector"

interface ContactFormProps {
  contact?: Contact | null  // Contact existant en cas de modification
  onSubmit: (contact: any) => void
  onCancel: () => void
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  // État local du formulaire initialisé avec les données du contact ou des valeurs vides
  const [formData, setFormData] = useState<Partial<Contact>>({
    firstName: contact?.firstName || "",
    lastName: contact?.lastName || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    avatarSlug: contact?.avatarSlug || null,
  })

  /**
   * Gère les changements dans les champs du formulaire
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Gère la soumission du formulaire
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ajoute l'ID si c'est une modification
    onSubmit(contact ? { ...formData, id: contact.id } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* En-tête du formulaire */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{contact ? "Edit Contact" : "Add New Contact"}</h2>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      {/* Champs nom et prénom */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Champs email et téléphone */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      {/* Sélection de l'avatar */}
      <div className="space-y-4">
        <Label>Avatar</Label>
        <AvatarSelector
          selectedAvatar={formData.avatarSlug ?? null}
          onAvatarSelect={(avatar) => setFormData(prev => ({ ...prev, avatarSlug: avatar }))}
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {contact ? "Update Contact" : "Add Contact"}
        </Button>
      </div>
    </form>
  )
}
