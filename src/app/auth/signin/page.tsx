import React from "react";

import LoginButton from "@/components/auth/login-button";

export default function SignInPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-50">
      <div className="flex flex-col gap-12 max-w-96 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-col gap-2">
          <div className="text-primary flex flex-row justify-center">
            <div className="text-4xl font-bold">🌼</div> 
          </div>
          <p className="text-left text-slate-500">Hey 👋 Please login to proceed</p>
        </div>
        <div className="my-5">
          <LoginButton />
        </div>
      </div>
    </main>
  )
}