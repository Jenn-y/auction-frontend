import axios from "axios";
import HeaderConfig from "utils/HeaderConfig";

import { DEV_API, PROD_API } from "./ApiConstants";

const API_URL = process.env.NODE_ENV === "development" ? DEV_API : PROD_API

class PaymentService {

	processPayment = (payment: any, token: string) => {
		return axios
			.post(API_URL + "payments/process", payment, HeaderConfig(token))
			.then((response: any) => {
				return response.data;
			})
			.catch(() => console.error("An error occured paying for the auction."));
	}
}

export default new PaymentService();
