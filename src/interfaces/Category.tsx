import { Auction } from "./Auction";

export interface Category {
	uuid: string;
	name: string;
	subcategory: Category;
	itemList: Auction;
}
