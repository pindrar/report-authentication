import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p className="text-center mt-10">You must be logged in.</p>
  }

  return (
    <div className="text-center mt-10">
      <h1>Welcome, {session.user?.email}</h1>
    </div>
  )
}
