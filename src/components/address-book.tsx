"use client"

import { ContactForm } from "@/components/contact-form"
import { ContactList } from "@/components/contact-list"
import { SearchBar } from "@/components/search-bar"
import { SortOptions } from "@/components/sort-options"
import { Button } from "@/components/ui/button"
import type { Contact } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"



export default function AddressBook() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const fetchContacts = async () => {
    const response = await fetch("/api/contacts")
    const data = await response.json()
    setContacts(data)
  }
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortField, setSortField] = useState<"firstName" | "lastName">("lastName")
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )
  })

  // Sort contacts based on sort field and order
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const fieldA = a[sortField].toLowerCase()
    const fieldB = b[sortField].toLowerCase()

    if (sortOrder === "asc") {
      return fieldA.localeCompare(fieldB)
    } else {
      return fieldB.localeCompare(fieldA)
    }
  })

  const handleAddContact = (contact: Omit<Contact, "id">) => {
    const newContact = {
      ...contact,
    }
    setContacts([...contacts, newContact])
    setIsAddingContact(false)
  }

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
    setSelectedContact(null)
  }

  const handleContactAdded = () => {
    fetchContacts()
  }

  const handleDeleteContact = async (id: number) => {
    const confirmed = confirm('Supprimer ce contact ?')
    if (confirmed) {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts(contacts => contacts.filter(c => c.id !== id))
      } else {
        console.error("Erreur de la suppression");
      }
    }
  };


  useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex items-center gap-4">
          <SortOptions
            sortField={sortField}
            sortOrder={sortOrder}
            onSortFieldChange={setSortField}
            onSortOrderChange={setSortOrder}
          />
          <Button onClick={() => setIsAddingContact(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      <ContactList contacts={sortedContacts} onSelect={setSelectedContact} onDelete={handleDeleteContact} />

      {(isAddingContact || selectedContact) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ContactForm
              contact={selectedContact}
              onSubmit={selectedContact ? handleUpdateContact : handleAddContact}
              onCancel={() => {
                setIsAddingContact(false)
                setSelectedContact(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
