"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function VideoFormSkeleton() {
  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="text-center space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-32" />
        </div>
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </CardContent>
    </Card>
  )
}

export function VideoResultsSkeleton() {
  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-36 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
