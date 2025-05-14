"use client"

import AddressBook from "@/components/address-book"

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-primary mb-8">Liste des Contacts</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AddressBook />
        </div>
      </div>
    </div>
  )
}
