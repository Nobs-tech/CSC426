import { NextRequest, NextResponse } from 'next/server'
import { findUserByUsername } from '@/lib/mockDatabase'
import { comparePasswords, generateToken } from '@/lib/auth'
import { validateLoginForm } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate input
    const errors = validateLoginForm(username, password)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      )
    }

    // Find user in mock database
    const user = findUserByUsername(username)
    if (!user) {
      return NextResponse.json(
        {
          message: 'Invalid username or password',
        },
        { status: 401 }
      )
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: 'Invalid username or password',
        },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
    })

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        username: user.username,
        userId: user.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        message: 'An error occurred during login',
      },
      { status: 500 }
    )
  }
}
