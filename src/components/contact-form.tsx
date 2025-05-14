"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Contact } from "@/lib/utils"
import { X } from "lucide-react"
import { useState } from "react"

interface ContactFormProps {
  contact?: Contact | null
  onSubmit: (contact: any) => void
  onCancel: () => void
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState<Partial<Contact>>({
    firstName: contact?.firstName || "",
    lastName: contact?.lastName || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    // avatar: contact?.avatar || "/placeholder.svg?height=100&width=100",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(contact ? { ...formData, id: contact.id } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{contact ? "Edit Contact" : "Add New Contact"}</h2>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{contact ? "Update Contact" : "Add Contact"}</Button>
      </div>
    </form>
  )
}
