// src/pages/contacts.tsx
import AddressBook from "@/components/address-book"
import { useEffect, useState } from "react"

interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  avatarSlug: string
  avatarColor: string
  favorite: boolean
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([])

  const fetchContacts = async () => {
    const response = await fetch("/api/contacts")
    const data = await response.json()
    setContacts(data)
  }

  const handleContactAdded = () => {
    fetchContacts()
  }

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Supprimer ce contact ?')
    if (confirmed) {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE'} )
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
    <div>
      <AddressBook />
 {/* <h1 className="text-3xl font-bold text-red-500 underline">
      Hello Tailwind!
    </h1>
      <div>
      <h1>Liste des Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Favori</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName} {contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.favorite ? "Oui" : "Non"}</td>
              <td>
                <button>Editer</button>
                <button onClick={async () => handleDelete(contact.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
        <ContactForm onContactAdded={handleContactAdded} />
      </div> */}
    </div>
  )
}
