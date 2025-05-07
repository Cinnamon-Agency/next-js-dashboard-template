import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserPermissionEnum } from 'enums/userRoleEnum'

export async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET
	})

	if (!request.nextUrl.pathname.startsWith('/admin')) {
		if (!token) {
			const loginUrl = new URL('/admin/login', request.url)
			return NextResponse.redirect(loginUrl)
		}
	}

	const permissions = token?.user.role.permissions

	if (request.nextUrl.pathname.startsWith('/admins')) {
		if (!permissions?.includes(UserPermissionEnum.ADMIN_READ)) {
			return NextResponse.redirect(new URL('/not-found', request.url))
		}
		if (request.nextUrl.pathname.startsWith('/admins/add') || request.nextUrl.pathname.startsWith('/admins/edit')) {
			if (!permissions?.includes(UserPermissionEnum.ADMIN_WRITE)) {
				return NextResponse.redirect(new URL('/not-found', request.url))
			}
		}
	}

	if (request.nextUrl.pathname.startsWith('/collaborations')) {
		if (!permissions?.includes(UserPermissionEnum.REVIEW_READ)) {
			return NextResponse.redirect(new URL('/not-found', request.url))
		}
		if (request.nextUrl.pathname.startsWith('/collaborations/edit')) {
			if (!permissions?.includes(UserPermissionEnum.REVIEW_WRITE)) {
				return NextResponse.redirect(new URL('/not-found', request.url))
			}
		}
	}

	if (request.nextUrl.pathname.startsWith('/reviews')) {
		if (!permissions?.includes(UserPermissionEnum.REVIEW_READ)) {
			return NextResponse.redirect(new URL('/not-found', request.url))
		}
		if (request.nextUrl.pathname.startsWith('/reviews/edit')) {
			if (!permissions?.includes(UserPermissionEnum.REVIEW_WRITE)) {
				return NextResponse.redirect(new URL('/not-found', request.url))
			}
		}
	}

	return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
	matcher: ['/admins/:path*', '/dashboard/:path*']
}
