import axios from "axios";
import { User } from "interfaces/User";
import HeaderConfig from "utils/HeaderConfig";
import { DEV_API, PROD_API } from "./ApiConstants";

const API_URL = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

class AuthService {
	login = (email: string, password: string) => {
		return axios
			.post(API_URL + "auth/login", {
				email,
				password
			})
			.then((response: any) => {
				if (response.data.authenticationToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}
				return response.data;
			})
			.catch((err) => {
				console.error(err);
				throw err;
			});
	}

	logout = () => {
		localStorage.removeItem("user");
	}

	getCurrentUser() {
		const user = localStorage.getItem('user')
		return user !== null ? JSON.parse(user) : null
	}

	register = async (firstName: string, lastName: string, email: string, password: string) => {
		return axios
			.post(API_URL + "auth/register", {
				firstName,
				lastName,
				email,
				password
			})
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while registering the user."));
	}

	getUser = async (email: string, token: string) => {
		return axios
			.get(API_URL + `users/${email}`, HeaderConfig(token))
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.log("An error occured while fetching the user."));
	}

	deactivate = (id: string, user: any, token: string) => {
		return axios
			.put(API_URL + `users/deactivate/${id}`, user, HeaderConfig(token))
			.then(() => {
				return
			})
			.catch(() => console.log("An error occured while deactivating the account."));
	}

	update = (id: string, user: any, token: string) => {
		return axios
			.put(API_URL + `users/update/${id}`, user, HeaderConfig(token))
			.then(() => {
				return
			})
			.catch(() => console.log("An error occured while updating the account."));
	}
}

export default new AuthService();
