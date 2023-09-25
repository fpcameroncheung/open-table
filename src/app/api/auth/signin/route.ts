import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import { cookies } from "next/dist/client/components/headers";

var prisma = new PrismaClient();

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const validationSchema = [
		{
			valid: validator.isEmail(email),
			errorMessage: "Email is invalid",
		},
		{
			valid: validator.isLength(password, { min: 1 }),
			errorMessage: "Password is invalid",
		},
	];

	const errors: string[] = [];
	validationSchema.forEach((check) => {
		if (!check.valid) {
			errors.push(check.errorMessage);
		}
	});

	if (errors.length) {
		return NextResponse.json(errors, { status: 400 });
	}

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user)
		return NextResponse.json(
			{ errorMessage: "Email or password is invalid" },
			{ status: 401 }
		);

	const passwordIsMatch = await bcrypt.compare(password, user.password);

	if (!passwordIsMatch)
		return NextResponse.json(
			{ errorMessage: "Email or password is invalid" },
			{ status: 401 }
		);

	const alg = "HS256";
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	const token = await new jose.SignJWT({ email: user.email })
		.setProtectedHeader({ alg })
		.setExpirationTime("24h")
		.sign(secret);

	cookies().set({
		name: "jwt",
		value: token,
		path: "/",
	});

	// return NextResponse.json({ token }, { status: 200 });
	return NextResponse.json(
		{
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			phone: user.phone,
			city: user.city,
		},
		{ status: 200 }
	);
}
