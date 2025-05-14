// // src/components/ContactForm.tsx
// import { useState } from "react"

// interface ContactFormProps {
//   onContactAdded: () => void
// }

// export default function ContactForm({ onContactAdded }: ContactFormProps) {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     avatarSlug: "",
//     avatarColor: "",
//     favorite: false,
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email)
//       {
//       alert('Tous les champs doivent être remplis');
//       return;
//     }
//     const response = await fetch("/api/contacts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })

//     if (response.ok) {
//       onContactAdded()  // Appel à la fonction parent pour rafraîchir la liste
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         avatarSlug: "",
//         avatarColor: "",
//         favorite: false,
//       })
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//     <h2>Ajouter un Contact</h2>
//     <label>
//     Prénom:
//     <input
//     type="text"
//     name="firstName"
//     value={formData.firstName}
//     onChange={handleChange}
//     />
//     </label>
//     <label>
//     Nom:
//     <input
//     type="text"
//     name="lastName"
//     value={formData.lastName}
//     onChange={handleChange}
//     />
//     </label>
//     <label>
//     Email:
//     <input
//     type="email"
//     name="email"
//     value={formData.email}
//     onChange={handleChange}
//     />
//     </label>
//     <label>
//     Téléphone:
//     <input
//     minLength={0}
//     maxLength={16}
//     pattern="\+?[0-9]*"
//     name="phone"
//     value={formData.phone}
//     onChange={handleChange}
//     />
//     </label>
//     <label>
//     Avatar (slug):
//     <input
//     type="text"
//     name="avatarSlug"
//     value={formData.avatarSlug}
//     onChange={handleChange}
//     />
//     </label>
//     <label>
//     Couleur de l'avatar:
//     <input
//     type="text"
//     name="avatarColor"
//     value={formData.avatarColor}
//     onChange={handleChange}
//     />
//     </label>
//     <label>
//     Favori:
//     <input
//     type="checkbox"
//     name="favorite"
//     checked={formData.favorite}
//     onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
//     />
//     </label>
//     <button type="submit">Ajouter</button>
//     </form>
//   )
// }
