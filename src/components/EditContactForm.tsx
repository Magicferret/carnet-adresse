import type { Contact } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function EditContact({ contact }: { contact: Contact }) {
  const [formData, setFormData] = useState(contact)
  const router = useRouter()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(`/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      router.push('/contacts')
    } else {
      alert('Erreur lors de la mise à jour')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" value={formData.lastName} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="phone" value={formData.phone} onChange={handleChange} />
      <button type="submit">Mettre à jour</button>
    </form>
  )
}
