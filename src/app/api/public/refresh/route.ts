import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return null
  }
}

const createAccessToken = (username: string) => {
  return jwt.sign({ username }, ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export async function POST(request: Request) {
  console.log('refresh')
  const { refreshToken } = await request.json()

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, error: 'Refresh token missing' },
      { status: 400 },
    )
  }

  const decoded = verifyToken(refreshToken, REFRESH_TOKEN_SECRET!)

  if (decoded) {
    //@ts-ignore
    const newAccessToken = createAccessToken(decoded.username!)
    return NextResponse.json(
      { success: true, accessToken: newAccessToken },
      { status: 200 },
    )
  } else {
    console.log('Invalid refresh token')
    return NextResponse.json(
      { success: false, error: 'Invalid refresh token' },
      { status: 401 },
    )
  }
}
