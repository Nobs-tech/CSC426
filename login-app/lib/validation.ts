// Validation utilities for login form
export interface ValidationErrors {
  username?: string
  password?: string
}

export function validateUsername(username: string): string | undefined {
  if (!username || username.trim().length === 0) {
    return 'Username is required'
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters'
  }
  if (username.length > 20) {
    return 'Username must be at most 20 characters'
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return 'Username can only contain letters, numbers, underscores, and hyphens'
  }
  return undefined
}

export function validatePassword(password: string): string | undefined {
  if (!password || password.length === 0) {
    return 'Password is required'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  if (password.length > 100) {
    return 'Password must be at most 100 characters'
  }
  return undefined
}

export function validateLoginForm(username: string, password: string): ValidationErrors {
  const errors: ValidationErrors = {}

  const usernameError = validateUsername(username)
  if (usernameError) {
    errors.username = usernameError
  }

  const passwordError = validatePassword(password)
  if (passwordError) {
    errors.password = passwordError
  }

  return errors
}

export function validateRegisterForm(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): ValidationErrors & { email?: string; confirmPassword?: string } {
  const errors = validateLoginForm(username, password) as any

  if (!email || email.trim().length === 0) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}
