'use server'

import { headers } from 'next/headers'

export const testFetch = async () => {
  const incomingHeaders = headers()
  const cookieHeader = incomingHeaders.get('cookie')

  const fetchHeaders: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (cookieHeader) {
    fetchHeaders['Cookie'] = cookieHeader
  }

  const res = await fetch('http://localhost:3000/api/testurl', {
    method: 'GET',
    headers: fetchHeaders,
    credentials: 'include',
  })

  const data = await res.json()
  console.log(data)
  return data
}
