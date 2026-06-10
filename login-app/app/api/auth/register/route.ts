import { NextRequest, NextResponse } from 'next/server'
import { findUserByUsername, addUser } from '@/lib/mockDatabase'
import { hashPassword, generateToken } from '@/lib/auth'
import { validateRegisterForm } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, confirmPassword } = body

    // Validate input
    const errors = validateRegisterForm(username, email, password, confirmPassword)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = findUserByUsername(username)
    if (existingUser) {
      return NextResponse.json(
        {
          message: 'Username already exists',
          errors: {
            username: 'This username is already taken',
          },
        },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create new user
    const newUser = addUser({
      username,
      email,
      passwordHash,
    })

    // Generate JWT token
    const token = generateToken({
      userId: newUser.id,
      username: newUser.username,
    })

    return NextResponse.json(
      {
        message: 'Registration successful',
        token,
        username: newUser.username,
        userId: newUser.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      {
        message: 'An error occurred during registration',
      },
      { status: 500 }
    )
  }
}
