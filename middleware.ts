import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}

export default async function middleware(req: NextRequest) {
    const jwt = req.cookies.get('jwt')?.value
    const admin = req.cookies.get('admin')?.value

    if (!admin && req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    if (!jwt && !req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if (jwt && req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}
