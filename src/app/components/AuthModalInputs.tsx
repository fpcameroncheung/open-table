import React from "react";

interface Props {
	inputs: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		city: string;
		password: string;
	};
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isSignIn: boolean;
}

export default function AuthModalInputs({ inputs, handleChangeInput, isSignIn }: Props) {
	return (
		<div>
			{!isSignIn && (
				<div className="my-3 flex justify-between text-sm">
					<input
						name="firstName"
						value={inputs.firstName}
						onChange={handleChangeInput}
						className="border rounded px-2 py-3 w-[49%]"
						placeholder="First Name"
					/>
					<input
						name="lastName"
						value={inputs.lastName}
						onChange={handleChangeInput}
						className="border rounded px-2 py-3 w-[49%]"
						placeholder="Last Name"
					/>
				</div>
			)}
			<div className="my-3 flex justify-between text-sm">
				<input
					name="email"
					value={inputs.email}
					onChange={handleChangeInput}
					className="border rounded px-2 py-3 w-full"
					placeholder="Email"
				/>
			</div>
			{!isSignIn && (
				<div className="my-3 flex justify-between text-sm">
					<input
						name="phone"
						value={inputs.phone}
						onChange={handleChangeInput}
						className="border rounded px-2 py-3 w-[49%]"
						placeholder="Phone"
					/>
					<input
						name="city"
						value={inputs.city}
						onChange={handleChangeInput}
						className="border rounded px-2 py-3 w-[49%]"
						placeholder="City"
					/>
				</div>
			)}
			<div className="my-3 flex justify-between text-sm">
				<input
					name="password"
					value={inputs.password}
					onChange={handleChangeInput}
					type="password"
					className="border rounded px-2 py-3 w-full"
					placeholder="Password"
				/>
			</div>
		</div>
	);
}
