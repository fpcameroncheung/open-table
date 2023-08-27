import NavBar from "@/app/components/NavBar";
import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { Metadata } from "next";
import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "OpenTable - Restaurant",
	description: "OpenTable description goes here",
};

interface Restaurant {
	id: number;
	name: string;
	images: string[];
	description: string;
	slug: string;
	reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRetaurantBySlug = async (slug: string): Promise<Restaurant> => {
	const restaurant = await prisma.restaurant.findUnique({
		select: {
			id: true,
			name: true,
			description: true,
			images: true,
			slug: true,
			reviews: true,
		},
		where: {
			slug: slug,
		},
	});

	if (!restaurant) {
		notFound();
		// throw new Error("Cannot find restaurant");
	}

	return restaurant;
};

export default async function RestaurantDetails({ params }: { params: { slug: string } }) {
	const restaurant = await fetchRetaurantBySlug(params.slug);
	return (
		<>
			<div className="bg-white w-[70%] rounded p-3 shadow">
				<RestaurantNavBar slug={restaurant.slug} />
				<Title name={restaurant.name} />
				<Rating reviews={restaurant.reviews} />
				<Description description={restaurant.description} />
				<Images images={restaurant.images} />
				<Reviews reviews={restaurant.reviews} />
			</div>
			<div className="w-[27%] relative text-reg">
				<ReservationCard />
			</div>
		</>
	);
}
