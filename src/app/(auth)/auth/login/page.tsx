import { LoginForm } from '@/components/admin-section/login/login-form'

export default async function LoginPage() {
  return (
    <div className="flex flex-col justify-center text-lg min-h-full items-center gap-y-10">
      <h1 className="text-3xl font-semibold">Login</h1>
      <div className="w-full h-full flex justify-center items-start">
        <LoginForm />
      </div>
    </div>
  )
}
