import React from "react"

export default function RootLayout({
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
