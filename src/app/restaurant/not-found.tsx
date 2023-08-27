"use client";

import Image from "next/image";
import React from "react";
import errorMascot from "../../../public/icons/icons/error.png";

export default function NotFound({error} : {error: Error}) {
	return (
		<div className="h-screen bg-gray-200 flex justify-center items-center">
			<div className="bg-white px-9 py-14 shadow rounded flex flex-col items-center">
				<Image src={errorMascot} alt="error" className="w-56 mb-8" />

				<h3 className="text-3xl font-bold">Well, this is embarassing</h3>
				<p className="text-reg font-bold">We couldn&apos;t find that restaurant</p>
				<p className="mt-6 text-sm font-light">Error code 404</p>
			</div>
		</div>
	);
}
