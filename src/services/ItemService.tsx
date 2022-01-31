import axios from "axios";

import { DEV_API, PROD_API } from "./ApiConstants";

const API_URL = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

class ItemService {

	getDidYouMeanString = (searchText: string, levenshteinDistance: number) => {
		return axios
			.get(API_URL + `items/didYouMean?searchText=${searchText}&levenshteinDistance=${levenshteinDistance}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.error("An error occured while fetching did-you-mean string"));
	}
}

export default new ItemService();
