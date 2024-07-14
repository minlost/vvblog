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

export async function POST(request: Request) {
  const { token, type } = await request.json()
  if (!token || !type) {
    return NextResponse.json(
      { valid: false, error: 'Token or type missing' },
      { status: 400 },
    )
  }

  const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET
  const decoded = verifyToken(token, secret!)

  if (decoded) {
    return NextResponse.json({ valid: true, decoded }, { status: 200 })
  } else {
    return NextResponse.json(
      { valid: false, error: 'Invalid token' },
      { status: 401 },
    )
  }
}
