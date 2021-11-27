import { Auction } from "./Auction";

export interface Category {
	id: string;
	name: string;
	subcategoryOf: Category;
	itemList: Auction;
}
