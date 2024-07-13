'use client'

import { testFetch } from '@/actions/test'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const handleFetch = async () => {
    const res = await fetch('http://localhost:3000/api/testurl', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    // router.refresh()
    const data = await res.json()
    console.log(data)
  }

  return (
    <main className="container ">
      <button onClick={handleFetch}>test</button>
    </main>
  )
}
