"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../../lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-end justify-start bg-transparent p-0 text-gray-600 relative",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-gray-200 text-gray-700 border border-gray-300 border-b-0 mr-1 hover:bg-gray-100 hover:text-gray-900",
      "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-inherit before:border-inherit before:transform before:skew-x-12 before:-z-10",
      "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-gray-400 data-[state=active]:z-10 data-[state=active]:shadow-sm data-[state=active]:relative data-[state=active]:mb-[-1px]",
      className
    )}
    style={{
      clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 100%, 0% 100%)"
    }}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-0 p-6 bg-white border border-gray-400 border-t-0 rounded-b-lg shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }