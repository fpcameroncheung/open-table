import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

const prices = [
	{ price: PRICE.CHEAP, label: "$" },
	{ price: PRICE.REGULAR, label: "$$" },
	{ price: PRICE.EXPENSIVE, label: "$$$" },
];

export default function SearchSideBar({
	cuisines,
	locations,
	searchParams,
}: {
	cuisines: {
		id: number;
		name: string;
	}[];
	locations: {
		id: number;
		name: string;
	}[];
	searchParams: {
		city?: string;
		cuisine?: string;
		price?: PRICE;
	};
}) {
	return (
		<div className="w-1/5">
			<div className="border-b pb-4 flex flex-col">
				<h1 className="mb-2">Location</h1>
				{locations.map((location) => (
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								city: location.name,
							},
						}}
						key={location.id}
						className="font-light text-reg capitalize"
					>
						{location.name}
					</Link>
				))}
			</div>
			<div className="border-b pb-4 mt-3 flex flex-col">
				<h1 className="mb-2">Cuisine</h1>
				{cuisines.map((cuisine) => (
					<Link
						href={{
							pathname: "/search",
							query: {
								...searchParams,
								cuisine: cuisine.name,
							},
						}}
						key={cuisine.id}
						className="font-light text-reg capitalize"
					>
						{cuisine.name}
					</Link>
				))}
			</div>
			<div className="mt-3 pb-4">
				<h1 className="mb-2">Price</h1>
				<div className="flex">
					{prices.map(({ price, label }) => {
						return (
							<Link
								key={label}
								href={{
									pathname: "/search",
									query: {
										...searchParams,
										price: price,
									},
								}}
								className="border w-full text-reg font-light rounded-l p-2 text-center"
							>
								{label}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
