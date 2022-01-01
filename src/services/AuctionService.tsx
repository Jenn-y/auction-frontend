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

	getAuctionsByCategoryId = (categoryId: any) => {
		return axios
			.get(API_URL + `auctions/categories/${categoryId}`)
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

    getActiveAuctionsBySeller = (status: any, sellerId: string, token: string) => {
        return axios
            .get(API_URL + `auctions/${status}/${sellerId}`, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the active auctions"));
    }

    getFilteredAuctions = (minPrice: number, maxPrice: number, categories: any, sortType: any) => {
        return axios 
            .get(API_URL + `auctions/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories}&sortType=${sortType}`)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching filtered auctions."))
    }

    getCountBySubcategory = (subcategoryId: string) => {
        return axios
            .get(API_URL + `auctions/countBySubcategory/${subcategoryId}`)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the number of auctions for the subcategory."));
    }

    getPriceInfo = () => {
        return axios 
            .get(API_URL + "auctions/priceInfo")
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the price information."))
    }

    getPriceCount = (auctions: any) => {
        return axios 
            .get(API_URL + `auctions/priceCount?auctions=${auctions}`)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the count per price."))
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

    getBidsByBidderId = (bidderId: any, token: string) => {
        return axios
            .get(API_URL + `bids/bidder/${bidderId}`, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the bids."));
    }

    getNoOfBids = (auctionId: any, token: string) => {
        return axios
            .get(API_URL + `bids/noOfBids/${auctionId}`, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the number of bids."));
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
