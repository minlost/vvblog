export async function refreshToken() {
  const response = await fetch('/api/refresh-token', {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const data = await response.json()
  return data.newToken
}
