import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry } from '@/app/page'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Handle POST request
    const entry: Entry = req.body
    console.log('Received new entry:', entry)
    
    // Here you would typically save the entry to a database
    // For now, we'll just send back a success response
    res.status(200).json({ message: 'Entry added successfully', entry })
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}