import { NextResponse } from 'next/server'

import { getCookie } from '@/lib/auth-helpers/cookieUtils'
import { redirectToLogin } from '@/lib/auth-helpers/redirectUtils'
import { refreshAccessToken } from '@/lib/auth-helpers/refreshAccessToken'
import { verifyToken } from '@/lib/auth-helpers/verifyToken'

export async function middleware(request: Request) {
  const cookies = request.headers.get('cookie')

  if (!cookies) {
    return redirectToLogin(request.url)
  }

  const accessToken = getCookie(cookies, 'accessToken')
  const refreshToken = getCookie(cookies, 'refreshToken')

  if (!accessToken) {
    console.log('No access token found, redirecting to login')
    return redirectToLogin(request.url)
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
      return redirectToLogin(request.url)
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
      const response = redirectToLogin(request.url)
      const cookieOptions =
        'Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict'
      response.headers.append('Set-Cookie', `refreshToken=; ${cookieOptions}`)
      response.headers.append('Set-Cookie', `accessToken=; ${cookieOptions}`)
      return response
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/testurl/:path*', '/api/private/:path*'],
}
