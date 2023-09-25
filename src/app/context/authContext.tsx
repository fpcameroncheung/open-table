"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Dispatch, createContext, useEffect, useState } from "react";

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	city: string;
}

interface State {
	loading: boolean;
	data: User | null;
	error: string | null;
}

interface AuthState extends State {
	setAuthState: Dispatch<State>;
}

export const AuthenticationContext = createContext<AuthState>({
	loading: true,
	data: null,
	error: null,
	setAuthState: () => {},
});

export default function AuthContext({ children }: { children: React.ReactNode }) {
	const [authState, setAuthState] = useState<State>({ loading: true, data: null, error: null });

	const fetchUser = async () => {
		setAuthState({
			data: null,
			error: null,
			loading: true,
		});

		try {
			const jwt = getCookie("jwt");

			if (!jwt) {
				setAuthState({
					data: null,
					error: null,
					loading: false,
				});
			}

			// Decode token serverside
			const response = await axios.get("http://localhost:3000/api/auth/me", {
				headers: { Authorization: `Bearer ${jwt}` },
			});

			// Set default header for axios
			axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
		} catch (error: any) {
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
