import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as jose from "jose";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const config = {
	matcher: "/api/:path*",
};

export async function POST(request: Request) {
	console.log("Hitting me");

	return NextResponse.json({ user: "user" }, { status: 200 });

	// const authorizationHeader = request.headers.get("authorization");

	// const bearerToken = authorizationHeader?.split(" ")[1];

	// if (!bearerToken) return NextResponse.json({ errorMessage: "Bearer token not supplied" }, { status: 401 });

	// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	// try {
	// 	await jose.jwtVerify(bearerToken, secret);
	// } catch (error) {
	// 	return NextResponse.json({ errorMessage: "Bearer token not valid" }, { status: 401 });
	// }

	// const payload = jwt.decode(bearerToken) as { email: string };

	// if (!payload) return NextResponse.json({ errorMessage: "Bearer token not valid" }, { status: 401 });

	// const user = await prisma.user.findUnique({
	// 	where: {
	// 		email: payload.email,
	// 	},
	// });

	// return NextResponse.json({ user }, { status: 200 });
}
