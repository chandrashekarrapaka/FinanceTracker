import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Entry } from '@/app/page'

const categories = [
  'Groceries', 'Utilities', 'Entertainment', 'Rent', 'Transportation',
  'Healthcare', 'Education', 'Salary', 'Investments', 'Other'
]

export default function Dashboard({ entries }: { entries: Entry[] }) {
  const totalIncome = entries.reduce((sum, entry) => entry.type === 'income' ? sum + entry.amount : sum, 0)
  const totalExpenses = entries.reduce((sum, entry) => entry.type === 'expense' ? sum + entry.amount : sum, 0)
  const netProfit = totalIncome - totalExpenses

  const chartData = categories.map(category => ({
    name: category,
    income: entries.filter(entry => entry.type === 'income' && entry.category === category)
      .reduce((sum, entry) => sum + entry.amount, 0),
    expenses: entries.filter(entry => entry.type === 'expense' && entry.category === category)
      .reduce((sum, entry) => sum + entry.amount, 0),
  }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-semibold">Total Income</p>
              <p className="text-green-600">${totalIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Total Expenses</p>
              <p className="text-red-600">${totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">Net Profit/Loss</p>
              <p className={netProfit >= 0 ? "text-green-600" : "text-red-600"}>
                ${Math.abs(netProfit).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" />
              <Bar dataKey="expenses" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}