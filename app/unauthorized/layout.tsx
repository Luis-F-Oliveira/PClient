import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Unauthorized"
}

export default function UnauthorizedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="container pt-5">
            {children}
        </div>
    )
}
