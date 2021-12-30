import { DATE_OF_BIRTH_EMPTY, EMAIL_EMPTY, EMAIL_INVALID, FIRST_NAME_EMPTY, GENDER_EMPTY, LAST_NAME_EMPTY, PASSWORD_EMPTY, PASSWORD_LENGTH, PHONE_NUMBER_EMPTY } from "constants/ErrorMessages";
import { Auction } from "interfaces/Auction";
import { LoginError } from "interfaces/LoginError";
import { RegistrationError } from "interfaces/RegistrationError";
import { User } from "interfaces/User";
import moment from "moment";

export const validateEmail = (email: string) => {
	return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email)
}

export const isValidLoginInput = (loginData: any) => {
	if (validateLoginData(loginData).isError) {
		return false
	}
	return true
}

export const isValidRegisterInput = (registerData: any) => {
	if (validateRegisterData(registerData).isError) {
		return false
	}
	return true
}

export const isValidAuctionSellingInput = (auction: any, user: any) => {
	const errors = { message: '', hasError: false }

	if (!auction.item || auction.item.name.length === 0 
		|| !auction.category || !auction.item.description
		|| auction.item.description.length === 0 || !auction.startPrice
		|| !auction.startDate || !auction.endDate || !user.shippingDetails.streetName
		|| user.shippingDetails.streetName.length === 0 || !user.shippingDetails.city
		|| user.shippingDetails.city.length === 0 || !user.shippingDetails.country
		|| user.shippingDetails.country.length === 0 || !user.shippingDetails.zipCode 
		|| !user.phoneNum) {

		errors.message = "You have some empty required fields!"
		errors.hasError = true
		return errors

	} else if (auction.startDate > auction.endDate) {
		errors.message = "Start date cannot be set higher than end date!"
		errors.hasError = true
		return errors

	} else if (moment(auction.endDate).toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10)) {
		errors.message = "End date cannot be set less than today!"
		errors.hasError = true
		return errors
	}

	return errors
}

export const validateRegisterData = (registerData: any) => {

	const validateErrors: RegistrationError = { firstName: '', lastName: '', email: '', password: '', isError: false };

	if (!registerData.firstName || registerData.firstName.length === 0) {
		validateErrors.firstName = FIRST_NAME_EMPTY
		validateErrors.isError = true
	}

	if (!registerData.lastName || registerData.lastName.length === 0) {
		validateErrors.lastName = LAST_NAME_EMPTY
		validateErrors.isError = true
	}

	if (!registerData.email || registerData.email.length === 0) {
		validateErrors.email = EMAIL_EMPTY
		validateErrors.isError = true
	} else if (!validateEmail(registerData.email)) {
		validateErrors.email = EMAIL_INVALID
		validateErrors.isError = true
	}

	if (!registerData.password || registerData.password.length === 0) {
		validateErrors.password = PASSWORD_EMPTY
		validateErrors.isError = true
	} else if (registerData.password.length < 6) {
		validateErrors.password = PASSWORD_LENGTH
		validateErrors.isError = true
	}

	return validateErrors;
}

export const validateLoginData = (loginData: any) => {

	const validateErrors: LoginError = { email: '', password: '', isError: false }

	if (!loginData.email || loginData.email.length === 0) {
		validateErrors.email = EMAIL_EMPTY
		validateErrors.isError = true
	} else if (!validateEmail(loginData.email)) {
		validateErrors.email = EMAIL_INVALID
		validateErrors.isError = true
	}

	if (!loginData.password || loginData.password.length === 0) {
		validateErrors.password = PASSWORD_EMPTY
		validateErrors.isError = true
	} else if (loginData.password.length < 6) {
		validateErrors.password = PASSWORD_LENGTH
		validateErrors.isError = true
	}

	return validateErrors
}

export const validateUserUpdateInfo = (userData: any) => {

	const errors = {
		firstName: {
			message: '',
			hasError: false
		},
		lastName: {
			message: '',
			hasError: false
		},
		gender: {
			message: '',
			hasError: false
		},
		dateOfBirth: {
			message: '',
			hasError: false
		},
		phoneNumber: {
			message: '',
			hasError: false
		},
		email: {
			message: '',
			hasError: false
		},
		canUpdate: true
	}

	if (!userData.firstName || userData.firstName.length === 0) {
		errors.firstName.message = FIRST_NAME_EMPTY
		errors.firstName.hasError = true
		errors.canUpdate = false
	}

	if (!userData.lastName || userData.lastName.length === 0) {
		errors.lastName.message = LAST_NAME_EMPTY
		errors.lastName.hasError = true
		errors.canUpdate = false
	}

	if (!userData.gender || userData.gender.length === 0) {
		errors.gender.message = GENDER_EMPTY
		errors.gender.hasError = true
		errors.canUpdate = false
	}

	if (!userData.dateOfBirth || userData.dateOfBirth === null) {
		errors.dateOfBirth.message = DATE_OF_BIRTH_EMPTY
		errors.dateOfBirth.hasError = true
		errors.canUpdate = false
	}

	if (!userData.phoneNum || userData.phoneNum.length === 0) {
		errors.phoneNumber.message = PHONE_NUMBER_EMPTY
		errors.phoneNumber.hasError = true
		errors.canUpdate = false
	}

	if (!userData.email || userData.email.length === 0) {
		errors.email.message = LAST_NAME_EMPTY
		errors.email.hasError = true
		errors.canUpdate = false
	} else if (!validateEmail(userData.email)) {
		errors.email.message = EMAIL_INVALID
		errors.email.hasError = true
		errors.canUpdate = false
	}

	return errors;
}

export const validateBidAmount = (bidAmount: number, highestBid: any) => {
	return bidAmount > highestBid;
}
