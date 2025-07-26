'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      alert("Registered! Please login.")
      router.push("/login")
    } else {
      const data = await res.json()
      alert(data.message || "Registration failed.")
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  )
}
