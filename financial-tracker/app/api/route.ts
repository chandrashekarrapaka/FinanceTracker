import { NextResponse } from 'next/server'
import { appendToSheet, readFromSheet } from '@/lib/sheets'

export async function GET() {
  try {
    const rows = await readFromSheet()
    const entries = rows.slice(1).map((row: any[]) => ({
      id: row[0],
      type: row[1],
      amount: parseFloat(row[2]),
      category: row[3],
      date: row[4],
      notes: row[5],
    }))
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const entry = await request.json()
    await appendToSheet([[
      entry.id,
      entry.type,
      entry.amount.toString(),
      entry.category,
      entry.date,
      entry.notes,
    ]])
    return NextResponse.json({ message: 'Entry added successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add entry' }, { status: 500 })
  }
}