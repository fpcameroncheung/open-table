import * as jose from "jose";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// export const config = {
// 	matcher: ["/api/auth/me"],
// };

const authorizationPaths = ["/api/auth/something"];

export async function middleware(request: NextRequest) {
	if (pathIncludes(request, authorizationPaths)) {
		console.log("Middleware - authorizationMiddleware");
		const isValid = await authorizationMiddleware(request);
		if (!isValid)
			return NextResponse.json(
				{ errorMessage: "Unauthorized to make this request" },
				{ status: 401 }
			);
	}
}

function pathIncludes(request: NextRequest, paths: string[]) {
	for (let i = 0; i < paths.length; i++) {
		if (request.nextUrl.pathname.match(paths[i])) return true;
	}

	return false;
}

async function authorizationMiddleware(request: NextRequest) {
	const authorizationHeader = request.headers.get("authorization");

	const bearerToken = authorizationHeader?.split(" ")[1];

	if (!bearerToken) return false;

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	try {
		await jose.jwtVerify(bearerToken, secret);
	} catch (error) {
		return false;
	}

	const email = jwt.decode(bearerToken) as { email: string };
	if (!email) false;

	return true;
}
