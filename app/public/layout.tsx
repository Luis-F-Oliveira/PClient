import Navbar from "@/components/navbar/navbar"
import React from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        {children}
      </main>
      <footer>

      </footer>
    </>
  )
}
