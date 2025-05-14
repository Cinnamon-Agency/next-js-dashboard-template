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

	if (request.nextUrl.pathname.startsWith('/admins')) {
		if (!token) {
			return NextResponse.redirect(loginUrl)
		}
		if (!permissions?.includes(UserPermissionEnum.ADMIN_READ)) {
			return NextResponse.redirect(notFound)
		}
		if (request.nextUrl.pathname.startsWith('/admins/add') || request.nextUrl.pathname.startsWith('/admins/edit')) {
			if (!permissions?.includes(UserPermissionEnum.ADMIN_WRITE)) {
				return NextResponse.redirect(notFound)
			}
		}
	}

	if (request.nextUrl.pathname.startsWith('/collaborations')) {
		if (!token) {
			return NextResponse.redirect(loginUrl)
		}
		if (!permissions?.includes(UserPermissionEnum.REVIEW_READ)) {
			return NextResponse.redirect(notFound)
		}
		if (request.nextUrl.pathname.startsWith('/collaborations/edit')) {
			if (!permissions?.includes(UserPermissionEnum.REVIEW_WRITE)) {
				return NextResponse.redirect(notFound)
			}
		}
	}

	if (request.nextUrl.pathname.startsWith('/reviews')) {
		if (!token) {
			return NextResponse.redirect(loginUrl)
		}
		if (!permissions?.includes(UserPermissionEnum.REVIEW_READ)) {
			return NextResponse.redirect(notFound)
		}
		if (request.nextUrl.pathname.startsWith('/reviews/edit')) {
			if (!permissions?.includes(UserPermissionEnum.REVIEW_WRITE)) {
				return NextResponse.redirect(notFound)
			}
		}
	}

	return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
	matcher: ['/admins/:path*', '/collaborations/:path*', '/reviews/:path*']
}
