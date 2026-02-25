import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  const auth = request.headers.get('authorization')
  if (auth) {
    const [, encoded] = auth.split(' ')
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')
    if (user === process.env.ADMIN_USERNAME &&
        pass === process.env.ADMIN_PASSWORD) {
      return NextResponse.next()
    }
  }
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="ACE Admin"' },
  })
}

export const config = { matcher: ['/admin/:path*'] }
