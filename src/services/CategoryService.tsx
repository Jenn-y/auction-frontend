import axios from "axios";

import { DEV_API, PROD_API } from "./ApiConstants";

const API_URL = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

class CategoryService {

	getLandingPageCategories = () => {
		return axios
			.get(API_URL + "categories")
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the categories"));
	}

	getAllCategories = () => {
		return axios
			.get(API_URL + "categories/all")
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the categories"));
	}

	getSubcategoriesByCategoryId = (categoryId: any) => {
		return axios
			.get(API_URL + `categories/subcategories/${categoryId}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the subcategories"));
	}

	getCategory = (id: any) => {
		return axios
			.get(API_URL + `categories/${id}`)
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the category."));
	}
}

export default new CategoryService();
