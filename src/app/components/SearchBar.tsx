"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
	const router = useRouter();
	const [location, setLocation] = useState("");
    
	return (
		<div className="text-left text-lg py-3 m-auto flex justify-center">
			<input
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				className="rounded  mr-3 p-2 w-[450px]"
				type="text"
				placeholder="State, city or town"
			/>
			<button
				onClick={() => {
					if (location === "banana") return;
					router.push(`/search?city=${location}`);
                    setLocation("");
				}}
				className="rounded bg-red-600 px-9 py-2 text-white"
			>
				Go
			</button>
		</div>
	);
}
