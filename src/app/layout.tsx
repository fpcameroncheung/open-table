import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import AuthContext from "./context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "OpenTable",
	description: "OpenTable description goes here",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="bg-gray-100 min-h-screen">
					<AuthContext>
						<main className="max-w-screen-2xl m-auto bg-white">
							<NavBar />
							{children}
						</main>
					</AuthContext>
				</main>
			</body>
		</html>
	);
}
