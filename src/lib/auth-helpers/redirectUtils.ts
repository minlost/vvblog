import { NextResponse } from 'next/server'

export const redirectToLogin = (url: string) => {
  const redirectUrl = new URL('/auth/login', url)
  return NextResponse.redirect(redirectUrl)
}
