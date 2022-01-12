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
            .catch(() => console.error("An error occured while fetching the auctions"));
    }

    getLastChance = () => {
        return axios
            .get(API_URL + "auctions/last_chance")
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the auctions"));
    }

    getActiveAuctionsBySeller = (status: any, sellerId: string, token: string) => {
        return axios
            .get(API_URL + `auctions/${status}/${sellerId}`, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the active auctions"));
    }

    getFilteredAuctions = (search: string, minPrice: number, maxPrice: number, categories: any, page: number) => {
        return axios 
            .get(API_URL + `auctions/categories/filter?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories}&page=${page}`)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching filtered auctions"))
    }

    getItem = (id: any) => {
        return axios
            .get(API_URL + `auctions/${id}`)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the item."));
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

    addAuction = (auction: any, token: string) => {
        return axios
            .post(API_URL + "auctions/new", auction, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while saving the auction."));
    }

    getBids = (auctionId: any, token: string) => {
        return axios
            .get(API_URL + `bids/${auctionId}`, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the bidders."));
    }

    getBidsByBidderId = (bidderId: any, token: string) => {
        return axios
            .get(API_URL + `bids/bidder/${bidderId}`, HeaderConfig(token))
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the bids."));
    }

    getHighestBid = (auctionId: any) => {
        return axios
            .get(API_URL + `bids/highestBid/${auctionId}`)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => console.error("An error occured while fetching the highest bid."));
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
            .catch(() => console.error("An error occured while saving the bid."));
    }
}

export default new AuctionService();
