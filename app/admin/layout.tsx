import Navbar from "@/components/navbar/navbar"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Admin"
}

export default function AdminLayout({
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
