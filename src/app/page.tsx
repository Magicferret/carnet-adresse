import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-white p-4 flex-col gap-8">
      <h1 className="text-4xl font-bold text-primary">Carnet d'Adresses</h1>
      <Link href="/contacts" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
        Voir mes contacts
      </Link>
    </div>
  )
}
