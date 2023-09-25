import { AuthenticationContext } from "@/app/context/authContext";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
	const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

	const signIn = async (
		{
			email,
			password,
		}: {
			email: string;
			password: string;
		},
		handleSuccess: () => void
	) => {
		setAuthState({ data: null, error: null, loading: true });

		try {
			const response = await axios.post("http://localhost:3000/api/auth/signin", {
				email,
				password,
			});

			console.log(response);
			setAuthState({ data: response.data, error: null, loading: false });
			handleSuccess();
		} catch (error: any) {
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	const signUp = async (
		{
			email,
			password,
			firstName,
			lastName,
			city,
			phone,
		}: {
			email: string;
			password: string;
			firstName: string;
			lastName: string;
			city: string;
			phone: string;
		},
		handleSuccess: () => void
	) => {
		setAuthState({ data: null, error: null, loading: true });

		try {
			const response = await axios.post("http://localhost:3000/api/auth/signup", {
				email,
				password,
				firstName,
				lastName,
				city,
				phone,
			});

			console.log(response);
			setAuthState({ data: response.data, error: null, loading: false });
			handleSuccess();
		} catch (error: any) {
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	const signOut = () => {
		deleteCookie("jwt");
		setAuthState({
			data: null,
			error: null,
			loading: false,
		});
	};

	return { signIn, signUp, signOut };
};

export default useAuth;
