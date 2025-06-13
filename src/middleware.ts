import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserPermissionEnum } from 'enums/userRoleEnum'

export async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET
	})

	const loginUrl = new URL('/admin/login', request.url)
	const notFound = new URL('/not-found', request.url)
	const permissions = token?.user?.role?.permissions

	if (request.nextUrl.pathname.startsWith('/data')) {
		if (!token) {
			return NextResponse.redirect(loginUrl)
		}
		if (!permissions?.includes(UserPermissionEnum.DATA_READ)) {
			return NextResponse.redirect(notFound)
		}
		if (request.nextUrl.pathname.startsWith('/data/edit')) {
			if (!permissions?.includes(UserPermissionEnum.DATA_WRITE)) {
				return NextResponse.redirect(notFound)
			}
		}
	}

	return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
	matcher: ['/data/:path*']
}
