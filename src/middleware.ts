import { NextResponse } from 'next/server'

const verifyToken = async (token: string, type: 'access' | 'refresh') => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify`,
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

const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh`,
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

export async function middleware(request: Request) {
  const cookies = request.headers.get('cookie')

  if (!cookies) {
    const redirectUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  const accessToken = cookies
    .split(';')
    .find((cookie: string) => cookie.trim().startsWith('accessToken='))
    ?.split('=')[1]

  const refreshToken = cookies
    .split(';')
    .find((cookie: string) => cookie.trim().startsWith('refreshToken='))
    ?.split('=')[1]

  if (!accessToken) {
    console.log('No access token found, redirecting to login')
    const redirectUrl = new URL('/auth/login', request.url)
    console.log('Redirecting to:', redirectUrl.toString())
    return NextResponse.redirect(redirectUrl)
  }

  const accessTokenData = await verifyToken(accessToken, 'access')
  console.log('Access token data:', accessTokenData)

  if (accessTokenData.valid) {
    console.log('Access token valid, proceeding to next')
    return NextResponse.next()
  } else {
    console.log('Access token invalid')
    if (!refreshToken) {
      console.log('No refresh token found, redirecting to login')
      const redirectUrl = new URL('/auth/login', request.url)
      console.log('Redirecting to:', redirectUrl.toString())
      return NextResponse.redirect(redirectUrl)
    }

    const refreshData = await refreshAccessToken(refreshToken)
    console.log('Refresh token data:', refreshData)

    if (refreshData.success) {
      console.log('Refresh token valid, setting new access token')
      const newAccessToken = refreshData.accessToken

      const response = NextResponse.next()
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
      return response
    } else {
      console.log('Refresh token validation failed, redirecting to login')
      const redirectUrl = new URL('/auth/login', request.url)
      console.log('Redirecting to:', redirectUrl.toString())
      return NextResponse.redirect(redirectUrl, 302)
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/testurl/:path*'],
}
