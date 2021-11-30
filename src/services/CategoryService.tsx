import axios from "axios";

const API_URL = "http://localhost:8080/api/";

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
}

export default new CategoryService();
