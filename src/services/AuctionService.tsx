import axios from "axios";
import HeaderConfig from "utils/HeaderConfig";

const API_URL = "http://localhost:8080/api/";

class AuctionService {

	getNewArrivals = () => {
		return axios
			.get(API_URL + "auctions/new_arrivals")
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the auctions"));
	}

	getLastChance = () => {
		return axios
			.get(API_URL + "auctions/last_chance")
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the auctions"));
	}

	getItem = (id: any) => {
		return axios
			.get(API_URL + `auctions/${id}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the item."));
	}

	getBids = (auctionId: any, token: string) => {
		return axios
			.get(API_URL + `bids/${auctionId}`, HeaderConfig(token))
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the bidders."));
	}
}

export default new AuctionService();
