import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Entry } from '@/app/page'

const categories = [
  'Groceries', 'Utilities', 'Entertainment', 'Rent', 'Transportation',
  'Healthcare', 'Education', 'Salary', 'Investments', 'Other'
]

export default function AddEntry({ addEntry, onCancel }: { addEntry: (entry: Entry) => void, onCancel: () => void }) {
  const [newEntry, setNewEntry] = useState<Partial<Entry>>({
    type: 'expense',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEntry(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewEntry(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.amount && newEntry.category && newEntry.date) {
      const entryToAdd = { ...newEntry, id: Date.now().toString() } as Entry
      addEntry(entryToAdd)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">Type</label>
            <Select
              value={newEntry.type}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">Amount (₹)</label>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={newEntry.amount || ''}
              onChange={handleInputChange}
              placeholder="Enter amount in Rupees"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <Select
              value={newEntry.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Input
              id="date"
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Notes</label>
            <Input
              id="notes"
              name="notes"
              value={newEntry.notes}
              onChange={handleInputChange}
              placeholder="Add notes"
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between pt-4">
            <Button type="submit">Add Entry</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}