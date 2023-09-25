"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState, useContext } from "react";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "../context/authContext";
import { CircularProgress } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
	const { error, loading, data, setAuthState } = useContext(AuthenticationContext);
	const { signIn, signUp } = useAuth();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		city: "",
		password: "",
	});
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (isSignIn) {
			if (inputs.password && inputs.email) {
				return setDisabled(false);
			}
		} else {
			if (
				inputs.firstName &&
				inputs.lastName &&
				inputs.email &&
				inputs.city &&
				inputs.phone &&
				inputs.password
			) {
				return setDisabled(false);
			}
		}
	}, [inputs, isSignIn]);

	const renderContent = (signInContent: string, signUpContent: string) => {
		return isSignIn ? signInContent : signUpContent;
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleClick = () => {
		if (isSignIn) {
			signIn({ email: inputs.email, password: inputs.password }, handleClose);
		} else {
			signUp(
				{
					firstName: inputs.firstName,
					lastName: inputs.lastName,
					email: inputs.email,
					city: inputs.city,
					phone: inputs.phone,
					password: inputs.password,
				},
				handleClose
			);
		}
	};

	return (
		<div>
			<button
				onClick={handleOpen}
				className={`${renderContent(
					"bg-blue-400 text-white",
					""
				)} border p-1 px-4 rounded mr-3`}>
				{renderContent("Sign In", "Sign Up")}
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					{loading ? (
						<div className="p-2 h-[600px] flex justify-center items-center">
							<CircularProgress />
						</div>
					) : (
						<div className="p-2 h-[600px]">
							{error && <div>There was an error: {error}</div>}
							<div>
								{data?.firstName} {data?.lastName}
							</div>
							<div className="font-bold uppercase text-center pb-2 border-b mb-2">
								<p className="text-sm">
									{renderContent("Sign In", "Create Account")}
								</p>
							</div>
							<div className="m-auto">
								<h2 className="text-2xl font-light text-center">
									{renderContent(
										"Log Into Your Account",
										"Create Your OpenTable Account"
									)}
								</h2>
								<AuthModalInputs
									inputs={inputs}
									handleChangeInput={handleChangeInput}
									isSignIn={isSignIn}
								/>
								<button
									onClick={handleClick}
									disabled={disabled}
									className="upppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
									{renderContent("Sign In", "Create Account")}
								</button>
							</div>
						</div>
					)}
				</Box>
			</Modal>
		</div>
	);
}
