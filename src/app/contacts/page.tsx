"use client"

import AddressBook from "@/components/address-book"

export default function ContactsPage() {
  return (
    <div className="min-h-screen dark:bg-gray-900 light:bg-gray-200">
      <div className="container mx-auto p-6 foreground flex flex-col space-between">
        <h1 className="text-3xl font-bold text-primary mb-8">Liste des Contacts</h1>
        <div className="rounded-lg shadow-sm p-6">
          <AddressBook />
        </div>
      </div>
    </div>
  )
}
