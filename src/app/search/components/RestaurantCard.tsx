import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";

interface Restaurant {
	id: number;
	name: string;
	main_image: string;
	slug: string;
	price: PRICE;
	location: Location;
	cuisine: Cuisine;
	reviews: Review[];
}
export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
	const renderRatingText = () => {
		const rating = calculateReviewRatingAverage(restaurant.reviews);
		if (rating > 4) return "Awesome";
		else if (rating <= 4 && rating > 3) return "Good";
		else if (rating <= 3 && rating > 0) return "Average";
		else "";
	};

	return (
		<div className="border border-gray-200 flex rounded p-3">
			<img src={restaurant.main_image} alt="" className="w-44 rounded" />
			<div className="pl-5">
				<h2 className="text-3xl">{restaurant.name}</h2>
				<div className="flex items-start">
					<div className="flex mb-2">
						<Stars reviews={restaurant.reviews} />
					</div>
					<p className="ml-2 text-sm">{renderRatingText()}</p>
				</div>
				<div className="mb-9">
					<div className="font-light flex text-reg">
						<div className="mr-4">
							<Price price={restaurant.price} />
						</div>
						<p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
						<p className="mr-4 capitalize">{restaurant.location.name}</p>
					</div>
				</div>
				<div className="text-red-600">
					<Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
				</div>
			</div>
		</div>
	);
}
