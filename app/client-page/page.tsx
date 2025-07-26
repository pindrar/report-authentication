"use client";

import { useSession } from "next-auth/react";

export default function ClientPage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  if (!session) {
    return <p className="text-center mt-10">You must be logged in.</p>;
  }

  return (
    <div className="text-center mt-10">
      <h1>Welcome in Client, {session.user?.email}</h1>
    </div>
  );
}
