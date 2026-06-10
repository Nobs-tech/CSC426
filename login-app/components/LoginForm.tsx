'use client'

import { useState, FormEvent } from 'react'
import { validateLoginForm } from '@/lib/validation'

interface LoginFormProps {
  onSuccess?: (token: string, username: string) => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleReset = () => {
    setUsername('')
    setPassword('')
    setErrors({})
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    // Client-side validation
    const validationErrors = validateLoginForm(username, password)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.message || 'Login failed. Please try again.')
        return
      }

      setSuccessMessage('Login successful! Redirecting...')
      // Store token in localStorage (for demo purposes)
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(data.token, data.username)
      }

      // Reset form
      handleReset()

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1500)
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
        <p className="text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-foreground">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
              errors.username
                ? 'border-destructive bg-destructive/5 text-foreground placeholder:text-destructive/50'
                : 'border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary'
            } focus:outline-none focus:ring-2 focus:ring-primary/20`}
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-sm text-destructive font-medium">{errors.username}</p>
          )}
          <p className="text-xs text-muted-foreground">Min 3 characters, alphanumeric, dash, underscore</p>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                errors.password
                  ? 'border-destructive bg-destructive/5 text-foreground placeholder:text-destructive/50'
                  : 'border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary'
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive font-medium">{errors.password}</p>
          )}
          <p className="text-xs text-muted-foreground">Min 6 characters</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive text-destructive text-sm">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500 text-green-600 text-sm">
            {successMessage}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
          <button
            type="reset"
            onClick={handleReset}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Demo Credentials */}
      <div className="rounded-lg bg-muted p-4 space-y-2">
        <p className="text-sm font-medium text-foreground">Demo Credentials:</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            <strong>Admin:</strong> admin / admin123
          </li>
          <li>
            <strong>User:</strong> user / password123
          </li>
          <li>
            <strong>Test:</strong> test / testpass123
          </li>
        </ul>
      </div>
    </div>
  )
}
