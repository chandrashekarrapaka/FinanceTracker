import { useState } from 'react'
import { Entry } from '@/app/page'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function EntriesView({ entries }: { entries: Entry[] }) {
  const [filterMonth, setFilterMonth] = useState<string | null>(null)
  const [filterYear, setFilterYear] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date)
    return (
      (!filterMonth || entryDate.getMonth() + 1 === parseInt(filterMonth)) &&
      (!filterYear || entryDate.getFullYear() === parseInt(filterYear)) &&
      (!filterCategory || entry.category === filterCategory)
    )
  })

  const totalIncome = filteredEntries.reduce((sum, entry) => entry.type === 'income' ? sum + entry.amount : sum, 0)
  const totalExpenses = filteredEntries.reduce((sum, entry) => entry.type === 'expense' ? sum + entry.amount : sum, 0)
  const balance = totalIncome - totalExpenses

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)
  const categories = Array.from(new Set(entries.map(entry => entry.category)))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4">
          <Select value={filterMonth || undefined} onValueChange={(value) => setFilterMonth(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map(month => (
                <SelectItem key={month} value={month.toString()}>
                  {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterYear || undefined} onValueChange={(value) => setFilterYear(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterCategory || undefined} onValueChange={(value) => setFilterCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-semibold">Total Income</p>
              <p className="text-green-600">₹{totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Total Expenses</p>
              <p className="text-red-600">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Balance</p>
              <p className={balance >= 0 ? "text-green-600" : "text-red-600"}>
                ₹{Math.abs(balance).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="border-b py-2">
              <p className="font-semibold">{entry.category} - {entry.date}</p>
              <p className={entry.type === 'income' ? "text-green-600" : "text-red-600"}>
                ₹{entry.amount.toFixed(2)} - {entry.type}
              </p>
              {entry.notes && <p className="text-sm text-gray-500">{entry.notes}</p>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}