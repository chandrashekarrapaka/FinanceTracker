import { NextResponse } from 'next/server'
import { Entry } from '@/app/page'

export async function POST(request: Request) {
  const entry: Entry = await request.json()
  console.log('Received new entry:', entry)
  
  // Here you would typically save the entry to a database
  // For now, we'll just send back a success response
  return NextResponse.json({ message: 'Entry added successfully', entry })
}