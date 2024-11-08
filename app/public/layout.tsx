import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/partials/sidebar"
import React from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="container">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
