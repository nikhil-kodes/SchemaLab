import { Metadata } from "next"
import { AuthForm } from "@/components/auth/AuthForm"

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
}

export default function AuthPage() {
  return (
    <div className="page-bg min-h-screen flex items-center justify-center p-4">
      <AuthForm />
    </div>
  )
}
