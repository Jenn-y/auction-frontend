export interface PaymentDetails {
	id: string;
	paypal: boolean;
	cardName: string;
	cardNumber: number;
	expirationDate: Date;
	verificationCode: string;
}
