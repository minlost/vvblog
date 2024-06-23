import { NextResponse } from 'next/server'

const CONST_EXAMPLE_LOGIN = {
  username: 'admin',
  password: 'admin',
}

const createAccessToken = (username: string) => {
  return Buffer.from(`${username}:admin`).toString('base64')
}

const createRefreshToken = (username: string) => {
  return Buffer.from(`${username}:admin`).toString('base64')
}

export async function POST(request: Request) {
  const { username, password } = await request.json()

  console.log(username, password)

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

  // Nastavení cookies
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
