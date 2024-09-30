"use client"

import { useState, useEffect } from 'react'
import EntriesView from '@/components/EntriesView'
import { Entry } from '../page'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Home, PlusCircle, List } from 'lucide-react'

export default function EntriesPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedEntries = localStorage.getItem('financialEntries')
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries))
    }
  }, [])

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold text-center mb-6">All Entries</h1>
      <EntriesView entries={entries} />
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="flex justify-around p-2 max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/add')}>
            <PlusCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => router.push('/entries')}>
            <List className="h-6 w-6" />
          </Button>
        </div>
      </nav>
    </div>
  )
}