import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'your-secret-token'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (token === ADMIN_TOKEN) {
      // Set the token in a cookie
      cookies().set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
} 