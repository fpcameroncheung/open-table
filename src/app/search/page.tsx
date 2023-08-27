import { Metadata } from "next";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSidebar";
import { useRouter } from "next/navigation";
import { PRICE, PrismaClient } from "@prisma/client";
import { equal } from "assert";

export const metadata: Metadata = {
	title: "OpenTable - Search",
	description: "OpenTable description goes here",
};

interface SearchParams {
	city?: string;
	cuisine?: string;
	price?: PRICE;
}

const prisma = new PrismaClient();

const fetchRetaurantByCity = (searchParams: SearchParams) => {
	const select = {
		id: true,
		name: true,
		main_image: true,
		price: true,
		cuisine: true,
		location: true,
		slug: true,
		reviews: true,
	};

	const where: any = {};

	if (searchParams.city) {
		const location = {
			name: { equals: searchParams.city.toLowerCase() },
		};
		where.location = location;
	}

	if (searchParams.cuisine) {
		const cuisine = {
			name: { equals: searchParams.cuisine.toLowerCase() },
		};
		where.cuisine = cuisine;
	}

	if (searchParams.price) {
		const price = {
			price: { equals: searchParams.price },
		};
		where.price = price;
	}

	return prisma.restaurant.findMany({
		select: select,
		where: where,
	});
};

const fetchLocations = async () => {
	return prisma.location.findMany({
		select: {
			id: true,
			name: true,
		},
	});
};

const fetchCuisines = async () => {
	return prisma.cuisine.findMany({
		select: {
			id: true,
			name: true,
		},
	});
};

export default async function Search({ searchParams }: { searchParams: SearchParams }) {
	const restaurants = await fetchRetaurantByCity(searchParams);
	const locations = await fetchLocations();
	const cuisines = await fetchCuisines();

	return (
		<>
			<Header />
			<div className="flex py-4 m-auto w-2/3 justify-between items-start">
				<SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
				<div className="w-5/6 ml-4 flex flex-col gap-5">
					{restaurants.length > 0 ? (
						restaurants.map((restaurant) => {
							return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
						})
					) : (
						<p>No restaurants found</p>
					)}
				</div>
			</div>
		</>
	);
}
