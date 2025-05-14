/**
 * Composant qui affiche la liste des contacts groupés par première lettre.
 * Gère l'affichage et l'organisation des cartes de contact.
 */
"use client"

import { ContactCard } from "@/components/contact-card"
import type { Contact } from "@/lib/utils"

interface ContactListProps {
  contacts: Contact[]
  onSelect: (contact: Contact) => void
  onDelete: (id: string | number) => void
  sortField: "firstName" | "lastName"
}

export function ContactList({ contacts, onSelect, onDelete, sortField }: ContactListProps) {
  // Groupe les contacts par première lettre du champ de tri
  const groupedContacts: Record<string, Contact[]> = {}

  contacts.forEach(contact => {
    const value = contact[sortField]
    const firstLetter = value.charAt(0).toUpperCase()
    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = []
    }
    groupedContacts[firstLetter].push(contact)
  })

  // Trie les clés alphabétiquement
  const sortedKeys = Object.keys(groupedContacts).sort()

  return (
    <div className="space-y-8">
      {contacts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No contacts found</p>
        </div>
      ) : (
        sortedKeys.map(letter => (
          <div key={letter} className="space-y-4">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-2">
              <h2 className="text-2xl font-bold border-b pb-2">{letter}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedContacts[letter].map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={onSelect}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
