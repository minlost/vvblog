import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const CONST_EXAMPLE_LOGIN = {
  username: 'admin',
  password: 'admin',
}

// Secret keys for JWT
const ACCESS_TOKEN_SECRET = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET

const createAccessToken = (username: string) => {
  return jwt.sign({ username }, ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

const createRefreshToken = (username: string) => {
  return jwt.sign({ username }, REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })
}

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (
    username !== CONST_EXAMPLE_LOGIN.username ||
    password !== CONST_EXAMPLE_LOGIN.password
  ) {
    return new NextResponse(
      JSON.stringify({
        success: false,
      }),
      {
        status: 401,
      },
    )
  }

  const accessToken = createAccessToken(username)
  const refreshToken = createRefreshToken(username)

  const response = new NextResponse(
    JSON.stringify({
      success: true,
    }),
    {
      status: 200,
    },
  )

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
  })

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
  })
  return response
}
