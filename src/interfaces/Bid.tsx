import { Auction } from "./Auction";
import { User } from "./User";

export interface Bid {
	id: string;
	bidAmount: number;
	bidDate: Date;
	buyer: User;
	auction: Auction;
}
