import { Metadata } from 'next'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Login - Authentication App',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="p-8 space-y-6">
            <LoginForm />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo Authentication Application</p>
          <p className="text-xs mt-2">
            This is a demonstration of a secure login system with validation and error handling.
          </p>
        </div>
      </div>
    </main>
  )
}
