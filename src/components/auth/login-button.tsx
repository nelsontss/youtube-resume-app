"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function LoginButton() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const handleClick = useCallback(() => {
    if (!isClient) return;

    const urlParams = new URLSearchParams(window.location.search);
    const callbackUrl = urlParams.get("callbackUrl") || "/app";

    signIn("google", { callbackUrl: callbackUrl })
  }, [isClient])

  return (
    <button onClick={handleClick} className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
        <Image src="https://www.svgrepo.com/show/355037/google.svg" width={100} height={100} className="w-6 h-6" alt="Google logo" /> <span>Login with Google</span>
    </button>
  )
}
