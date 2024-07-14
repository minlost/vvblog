'use client'

import { testFetch } from '@/actions/test'
import { getApi } from '@/services/api'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const handleFetch = async () => {
    const res = await getApi().test()
    console.log('data', res)
  }

  return (
    <main className="container ">
      <button onClick={handleFetch}>test</button>
    </main>
  )
}
