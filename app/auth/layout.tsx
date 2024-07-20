import React from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {children} 
    </main>
  )
}
