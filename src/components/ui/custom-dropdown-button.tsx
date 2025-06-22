"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownOption {
  text: string
  link: string
}

interface CustomDropdownButtonProps {
  buttonText: string
  options: DropdownOption[]
}

export function CustomDropdownButtonComponent({ buttonText, options }: CustomDropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-auto">
          <span className="hidden sm:inline">{buttonText}</span>
          <Menu className="h-5 w-5 sm:ml-2 sm:h-4 sm:w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map((option, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              href={option.link}
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              {option.text}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}