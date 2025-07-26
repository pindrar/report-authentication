'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    })

    if (res?.ok) {
      router.push("/")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  )
}
