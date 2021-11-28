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
}

export default new CategoryService();
