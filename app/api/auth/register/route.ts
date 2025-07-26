import { hashPassword } from "@/lib/hash"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const { email, name, password } = body

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return new Response(JSON.stringify({ message: "Email already registered" }), { status: 400 })
  }

  const hashed = await hashPassword(password)

  await prisma.user.create({
    data: { email, name, password: hashed },
  })

  return new Response(JSON.stringify({ message: "User created" }), { status: 201 })
}
