import React from "react";

import { auth } from "@/auth";
import { getUsers } from "@/lib/services/user-service";
import { redirect } from "next/navigation";

export default async function App() {
  const users = await getUsers()

  const session = await auth()
  const sessionUser = session?.user

  if (!sessionUser) {
    redirect("/api/auth/signin?callbackUrl=/app")
  }

  return (
    <main className="flex flex-col items-center justify-between">
      <h1>Authenticated route</h1>
      {
        users.map(user => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))
      }
    </main>
  )
}