/**
 * Composant principal du carnet d'adresses.
 * Gère l'état global des contacts, la recherche, le tri et les opérations CRUD.
 */
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
  // États pour la gestion des contacts et des filtres
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortField, setSortField] = useState<"firstName" | "lastName">("lastName")
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  /**
   * Récupère la liste des contacts depuis l'API
   */
  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts")
      if (!response.ok) throw new Error("Erreur lors de la récupération des contacts")
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  /**
   * Filtre les contacts en fonction de la recherche
   */
  const filteredContacts = contacts.filter(contact => {
    if (!contact || !contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
      return false
    }
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
    const query = searchQuery.toLowerCase()
    return fullName.includes(query) ||
           contact.email.toLowerCase().includes(query) ||
           contact.phone.includes(query)
  })

  /**
   * Trie les contacts selon les critères sélectionnés
   */
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (!a[sortField] || !b[sortField]) return 0
    const fieldA = a[sortField].toLowerCase()
    const fieldB = b[sortField].toLowerCase()
    return sortOrder === "asc" ?
           fieldA.localeCompare(fieldB) :
           fieldB.localeCompare(fieldA)
  })

  /**
   * Gère l'ajout d'un nouveau contact
   */
  const handleAddContact = async (contact: Omit<Contact, "id">) => {
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      })

      if (!response.ok) throw new Error("Erreur lors de l'ajout du contact")
      const newContact = await response.json()
      setContacts([...contacts, newContact])
      setIsAddingContact(false)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  /**
   * Gère la mise à jour d'un contact existant
   */
  const handleUpdateContact = async (updatedContact: Contact) => {
    try {
      const response = await fetch(`/api/contacts/${updatedContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      })

      if (!response.ok) throw new Error("Erreur lors de la mise à jour du contact")
      const updated = await response.json()
      setContacts(contacts.map(contact =>
        contact.id === updated.id ? updated : contact
      ))
      setSelectedContact(null)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  /**
   * Gère la suppression d'un contact
   */
  const handleDeleteContact = async (id: string | number) => {
    const confirmed = confirm("Supprimer ce contact ?")
    if (confirmed) {
      try {
        const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" })
        if (res.ok) {
          setContacts(contacts => contacts.filter(c => c.id !== id))
        } else {
          console.error("Erreur de la suppression")
        }
      } catch (error) {
        console.error("Erreur:", error)
      }
    }
  }

  // Charge les contacts au montage du composant
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

      <ContactList
        contacts={sortedContacts}
        onSelect={setSelectedContact}
        onDelete={handleDeleteContact}
        sortField={sortField}
      />

      {(isAddingContact || selectedContact) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-accent rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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
