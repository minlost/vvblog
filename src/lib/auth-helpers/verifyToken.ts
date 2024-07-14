export const verifyToken = async (
  token: string,
  type: 'access' | 'refresh',
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, type }),
    },
  )

  if (!response.ok) {
    return { valid: false, error: 'Invalid token' }
  }

  const data = await response.json()
  return data
}
