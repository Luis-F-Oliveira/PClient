import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}

export default async function middleware(req: NextRequest) {
    const jwt = req.cookies.get('jwt')?.value

    if (!jwt && !req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    if (jwt && req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/public', req.url))
    }

    return NextResponse.next()
}
