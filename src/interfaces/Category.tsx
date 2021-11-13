import { Auction } from "./Auction";

export interface Category {
	id: string;
	name: string;
	subcategory: Category;
	itemList: Auction;
}
