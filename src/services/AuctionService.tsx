import axios from "axios";

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

	getItem = (uuid: any) => {
		// console.log(uuid)
		return axios
			.get(API_URL + `auctions/${uuid}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the item."));
	}
}

export default new AuctionService();
