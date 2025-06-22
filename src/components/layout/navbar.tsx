import React from "react";

import Image from 'next/image'
import Link from 'next/link'
import SignInButton from '@/components/auth/signin-button'
import { ContentContainer } from '@/app/layout'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <ContentContainer>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/vercel.svg"
              alt="Website Logo"
              width={200}
              height={200}
              className="mr-2"
            />
          </Link>
          <SignInButton />
        </div>
      </ContentContainer>
    </nav>
  )
}