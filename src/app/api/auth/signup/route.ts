import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

var prisma = new PrismaClient();

export async function POST(request: Request) {
	const { firstName, lastName, email, city, phone, password } = await request.json();

	const validationSchema = [
		{
			valid: validator.isLength(firstName, { min: 1, max: 20 }),
			errorMessage: "First name is invalid",
		},
		{
			valid: validator.isLength(lastName, { min: 1, max: 20 }),
			errorMessage: "Last name is invalid",
		},
		{
			valid: validator.isEmail(email),
			errorMessage: "Email is invalid",
		},
		{
			valid: validator.isMobilePhone(phone),
			errorMessage: "Email is invalid",
		},
		{
			valid: validator.isLength(city, { min: 1 }),
			errorMessage: "City is invalid",
		},
		{
			valid: validator.isStrongPassword(password),
			errorMessage: "Password is not strong enough",
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

	if (userWithEmail) {
		return NextResponse.json({ errorMessage: "Account with this email already exists" }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			first_name: firstName,
			last_name: lastName,
			password: hashedPassword,
			city: city,
			phone: phone,
			email: email,
		},
	});

	const alg = "HS256";
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	const token = await new jose.SignJWT({ email: user.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret);

	return NextResponse.json({ token }, { status: 200 });
}
