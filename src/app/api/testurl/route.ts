import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Log the incoming cookies
  const cookies = request.headers.get('cookie')
  console.log('Incoming cookies:', cookies)

  return new Response(JSON.stringify({ message: 'Hello World' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
