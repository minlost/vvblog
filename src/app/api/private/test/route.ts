import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('testprivate')
  return new Response(JSON.stringify({ message: 'Hello World' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
