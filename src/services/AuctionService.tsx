import axios from "axios";
import { Bid } from "interfaces/Bid";
import HeaderConfig from "utils/HeaderConfig";
import { DEV_API, PROD_API } from "./ApiConstants";

const API_URL = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

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

	getHighestBid = (auctionId: any) => {
		return axios
			.get(API_URL + `bids/highestBid/${auctionId}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the highest bid."));
	}

	addBid = (bid: any, token: string) => {
		return axios
			.post(API_URL + "bids/newBid", bid, HeaderConfig(token))
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while saving the bid."));
	}
}

export default new AuctionService();
