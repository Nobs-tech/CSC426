'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username')
    setUsername(storedUsername)
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.href = '/login'
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="rounded-2xl border border-border bg-card shadow-lg p-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome, <span className="text-primary">{username}</span>!
            </h2>
            <p className="text-muted-foreground text-lg">
              You have successfully logged in to the application.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="rounded-xl border border-border bg-card shadow p-6 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Secure Login</h3>
            <p className="text-muted-foreground text-sm">
              Your credentials are protected with industry-standard encryption and password hashing.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-border bg-card shadow p-6 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Input Validation</h3>
            <p className="text-muted-foreground text-sm">
              Real-time validation ensures proper format and security requirements are met.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-border bg-card shadow p-6 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Fast & Responsive</h3>
            <p className="text-muted-foreground text-sm">
              Optimized performance with quick load times and responsive design for all devices.
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-xl border border-border bg-card shadow p-8 space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Application Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Frontend Components
              </h4>
              <ul className="text-muted-foreground text-sm space-y-2">
                <li>✓ Responsive login form with real-time validation</li>
                <li>✓ Password visibility toggle</li>
                <li>✓ Clear error and success messages</li>
                <li>✓ Loading states for better UX</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Backend Security
              </h4>
              <ul className="text-muted-foreground text-sm space-y-2">
                <li>✓ Bcryptjs password hashing</li>
                <li>✓ JWT token-based authentication</li>
                <li>✓ Server-side input validation</li>
                <li>✓ Mock MongoDB user database</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test Credentials */}
        <div className="mt-8 rounded-xl border border-border bg-muted/50 p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Test Credentials</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background rounded p-4">
              <p className="font-mono font-semibold text-foreground">admin</p>
              <p className="font-mono text-muted-foreground">admin123</p>
            </div>
            <div className="bg-background rounded p-4">
              <p className="font-mono font-semibold text-foreground">user</p>
              <p className="font-mono text-muted-foreground">password123</p>
            </div>
            <div className="bg-background rounded p-4">
              <p className="font-mono font-semibold text-foreground">test</p>
              <p className="font-mono text-muted-foreground">testpass123</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  )
}
