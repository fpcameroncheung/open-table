import React from "react";
import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

export default function Menu({ menu }: { menu: Item[] }) {
	return (
		<main className="bg-white mt-5">
			<div>
				<div className="mt-4 pb-1 mb-1">
					<h1 className="font-bold text-4xl">Menu</h1>
				</div>
				{menu.length > 0 ? (
					<div className="flex flex-wrap justify-between">
						{menu.map((item) => {
							return <MenuCard key={item.id} item={item} />;
						})}
					</div>
				) : (
					<div>No items</div>
				)}
			</div>
		</main>
	);
}