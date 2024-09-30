"use client"

import { useRouter } from 'next/navigation'
import AddEntry from '@/components/AddEntry'
import { Entry } from '../page'

export default function AddEntryPage() {
  const router = useRouter()

  const addEntry = (entry: Entry) => {
    const storedEntries = localStorage.getItem('financialEntries')
    const entries = storedEntries ? JSON.parse(storedEntries) : []
    entries.push(entry)
    localStorage.setItem('financialEntries', JSON.stringify(entries))
    router.push('/')
  }

  const handleCancel = () => {
    router.push('/')
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Entry</h1>
      <AddEntry addEntry={addEntry} onCancel={handleCancel} />
    </div>
  )
}