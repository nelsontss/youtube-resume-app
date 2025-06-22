import React from "react";

import { CustomDropdownButtonComponent } from "@/components/ui/custom-dropdown-button";
import { auth } from "@/auth";
import Link from "next/link";

const SignInButton = async () => {
  const session = await auth()

  if (session && session.user) {
    const options = [
      {
        text: 'Pricing',
        link: '/app/pricing'
      },
      {
        text: 'Subscription',
        link: '/app/subscription'
      },
      {
        text: "Sign Out",
        link: "/api/auth/signout?callbackUrl=/", 
      }
    ]

    return <CustomDropdownButtonComponent 
      buttonText={session.user.name ?? ''}
      options={options}
    />;
  }

  return (
    <Link href="/api/auth/signin?callbackUrl=/app" className="btn btn-ghost">
      Sign In
    </Link>
  );
};

export default SignInButton;