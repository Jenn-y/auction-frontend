import { Category } from "./Category";
import { Item } from "./Item";
import { User } from "./User";

export interface Auction {
	id: string;
	startDate: Date;
	endDate: Date;
	startPrice: number;
	highestBid: number;
	adress: string;
	phone: string;
	shippingCostIncluded: string;
	status: string;
	zipCode: number;
	item: Item;
	seller: User;
	category: Category;
}
