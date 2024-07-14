export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/public/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    },
  )

  if (!response.ok) {
    return { success: false, error: 'Invalid refresh token' }
  }

  const data = await response.json()
  return data
}
