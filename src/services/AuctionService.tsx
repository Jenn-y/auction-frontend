import axios from "axios";
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

	getFilteredAuctions = (minPrice: number, maxPrice: number, categories: any, subcategories: any) => {
		return axios 
			.get(API_URL + `auctions/categories/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories}&subcategories=${subcategories}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching filtered auctions"))
	}

	getItem = (id: any) => {
		return axios
			.get(API_URL + `auctions/${id}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the item."));
	}

	getCountBySubcategory = (subcategoryId: string) => {
		return axios
			.get(API_URL + `auctions/countBySubcategory/${subcategoryId}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the number of auctions for the subcategory."));
	}

	getMinPrice = (auctions: any) => {
		return axios 
			.get(API_URL + `auctions/minPrice?auctions=${auctions}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the minimum price"))
	}

	getMaxPrice = (auctions: any) => {
		return axios 
			.get(API_URL + `auctions/maxPrice?auctions=${auctions}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the maximum price"))
	}

	getAveragePrice = (auctions: any) => {
		return axios 
			.get(API_URL + `auctions/averagePrice?auctions=${auctions}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the average price"))
	}

	getPriceCount = (auctions: any) => {
		console.log(`auctions/priceCount?auctions=${auctions}`)
		return axios 
			.get(API_URL + `auctions/priceCount?auctions=${auctions}`)
			.then((response: any) => {
				console.log(response.data)
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the count per price."))
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
