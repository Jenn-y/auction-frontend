import { PaymentDetails } from "./PaymentDetails";
import { ShippingDetails } from "./ShippingDetails";

export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	phoneNum: string;
	gender: string;
	dateOfBirth: Date;
	createdAt: Date;
	updatedAt: Date;
	status: string;
	paymentDetails: PaymentDetails;
	shippingDetails: ShippingDetails;
}
