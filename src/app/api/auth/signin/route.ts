import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

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

	const userWithEmail = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!userWithEmail) return NextResponse.json({ errorMessage: "Email or password is invalid" }, { status: 401 });

	const passwordIsMatch = await bcrypt.compare(password, userWithEmail.password);

	if (!passwordIsMatch) return NextResponse.json({ errorMessage: "Email or password is invalid" }, { status: 401 });

	const alg = "HS256";
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	const token = await new jose.SignJWT({ email: userWithEmail.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

	return NextResponse.json({ token }, { status: 200 });
}
